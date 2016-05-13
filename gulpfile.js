process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var gulp = require('gulp');
var knex = require('./server/db/database');
var args = require('minimist')(process.argv.slice(2));
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var Cache = require('gulp-file-cache');
var KarmaServer = require('karma').Server;

var cache = new Cache();

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

gulp.task('compile', function() {
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

gulp.task('test:server', ['compile'], function () {
    return gulp.src(['server/build/test/**/*spec.js'])
      .pipe(mocha());
});

gulp.task('test:ui', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('watch', ['compile'], function () {
  var stream = nodemon({
    script: 'server/bin/www',
    ext: 'js html ts',
    env: { 'NODE_ENV': 'development' },
    nodeArgs: ['--debug'],
    watch: 'server',
    tasks: ['compile']
  })

  return stream
})