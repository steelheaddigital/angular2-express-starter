process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var gulp = require('gulp');
var knex = require('./server/db/database');
var args = require('minimist')(process.argv.slice(2));
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sassJspm = require('sass-jspm-importer');
var KarmaServer = require('karma').Server;
var Cache = require('gulp-file-cache');
var Builder = require('systemjs-builder');

gulp.task('migrate:latest', function() {
  return knex.migrate.latest({
    directory: './db/migrations'
  })
  .then(function () {
    return knex.migrate.currentVersion();
  })
  .then(function (version) {
    console.log("updated database to version: " + version);
    knex.destroy();
  })
  .catch(function (err) {
    console.error(err);
    knex.destroy();
  });
});

gulp.task('migrate:rollback', function() {
  return knex.migrate.rollback({
    directory: './db/migrations'
  })
  .then(function () {
    return knex.migrate.currentVersion();
  })
  .then(function (version) {
    console.log("rolled back database to version: " + version);
    knex.destroy();
  })
  .catch(function (err) {
    console.error(err);
    knex.destroy();
  });
});

gulp.task('migrate:make', function() {
  return knex.migrate.make(args.name, {
    directory: './db/migrations'
  })
  .then(function (version) {
    console.log("created migration");
    knex.destroy();
  })
  .catch(function (err) {
    console.error(err);
    knex.destroy();
  });
});

gulp.task('compile:server', function() {
  var cache = new Cache();
  var tsProject = ts.createProject('server/tsconfig.json', {
    allowJs: true
  });
  var stream = tsProject.src()
                        .pipe(sourcemaps.init())
                        .pipe(cache.filter())
                        .pipe(ts(tsProject))
                        .pipe(sourcemaps.write({includeContent: false, sourceRoot: function(file){ return file.cwd + '/server'; }}))
                        .pipe(cache.cache()) // cache them
                        .pipe(gulp.dest('./server/build')) // write them 
  return stream // important for gulp-nodemon to wait for completion
});

gulp.task('compile:client', function(done){
  var builder = new Builder('./client', 'client/config.js');
  // builder.loadConfig('client/config.js').then(function() {
    builder.bundle('app/*.ts', './client/dist/main.bundle.js', { sourceMaps: true }).then(function() {
        console.log('Build complete')
        done();
    })
    .catch(function(err) {
      console.log('Build error');
      console.log(err);
      done();
    });
});

gulp.task('compile:sass', function () {
  return gulp.src('./client/app/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      functions: sassJspm.resolve_function('/client/jspm_packages'),
      importer: sassJspm.importer
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('test:server', ['compile:server'], function () {
    return gulp.src(['server/build/test/**/*spec.js'])
      .pipe(mocha());
});

gulp.task('test:ui', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('compile:all', ['compile:server', 'compile:client', 'compile:sass']);

gulp.task('watch', ['compile:all'], function () {
  gulp.watch('client/app/*.scss', ['compile:sass']);
  gulp.watch('client/app/*.ts', ['compile:client']);
  var stream = nodemon({
    script: 'server/bin/www',
    ext: 'js html ts',
    env: { 'NODE_ENV': 'development' },
    nodeArgs: ['--debug'],
    watch: 'server',
    tasks: ['compile:server', 'compile:client', 'compile:sass']
  })

  return stream
})