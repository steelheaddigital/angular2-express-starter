process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var dotenv = require('dotenv');
dotenv.config();

var gulp = require('gulp');
var knex = require('./server/db/database');
var args = require('minimist')(process.argv.slice(2));
var mocha = require('gulp-mocha');
var server = require('gulp-develop-server');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sassJspm = require('sass-jspm-importer');
var path = require('path');
var template = require('gulp-template');
var jspm = require('gulp-jspm');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var htmlreplace = require('gulp-html-replace');
var del = require('del');
var plumber = require('gulp-plumber')
var KarmaServer = require('karma').Server;

gulp.task('migrate:latest', function() {
  return knex.migrate.latest({
    directory: './server/db/migrations'
  })
  .then(function () {
    return knex.migrate.currentVersion();
  })
  .then(function (version) {
    console.log("updated database to version: " + version);
    knex.destroy();
    process.exit();
  })
  .catch(function (err) {
    console.error(err);
    knex.destroy();
    process.exit();
  });
});

gulp.task('migrate:rollback', function() {
  return knex.migrate.rollback({
    directory: './server/db/migrations'
  })
  .then(function () {
    return knex.migrate.currentVersion();
  })
  .then(function (version) {
    console.log("rolled back database to version: " + version);
    knex.destroy();
    process.exit();
  })
  .catch(function (err) {
    console.error(err);
    knex.destroy();
    process.exit();
  });
});

gulp.task('migrate:make', function() {
  return knex.migrate.make(args.name, {
    directory: './server/db/migrations'
  })
  .then(function (version) {
    console.log("created migration");
    knex.destroy();
    process.exit();
  })
  .catch(function (err) {
    console.error(err);
    knex.destroy();
    process.exit();
  });
});

gulp.task('test:server', ['compile:server'], function () {
    return gulp.src(['server/build/**/*spec.js'])
      .pipe(mocha());
});

gulp.task('test:ui', function (done) {
  let spawn = require('child_process').spawn;
  let child = spawn('xvfb-run', ['karma', 'start']);

  child.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
  });
  child.stderr.on('data', function(data) {
      console.log('stderr: ' + data);
  });
  child.on('close', function(code) {
      console.log('closing code: ' + code);
  });
});

gulp.task('clean:client', function(done){
    del(['./client/dist/**/*']);
    done();
})

gulp.task('compile:client:html', function(){
  return gulp.src(['client/app/**/*.html', 'client/index.html', '!client/{jspm_packages,jspm_packages/**}'])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(flatten())
    .pipe(htmlreplace({
        'css': 'app.css',
        'js': 'main.bundle.js'
    }))
    .pipe(gulp.dest('./client/dist'))
});

gulp.task('compile:client:copy', function() {
  return gulp.src(
      ['./client/jspm_packages/system.js*', 
      './client/jspm.config.js'], 
      {base: './client'}
    )
    .pipe(gulp.dest('client/dist'))
})

gulp.task('compile:client:app', function(done){
  return gulp.src('client/app/main.ts')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(jspm())
    .pipe(rename('main.bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('client/dist'))
});

gulp.task('compile:client:sass', function () {
  return gulp.src('./client/app/*.scss')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      functions: sassJspm.resolve_function('/client/jspm_packages'),
      importer: sassJspm.importer
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/dist'));
});

gulp.task('compile:client', ['clean:client', 
  'compile:client:sass', 
  'compile:client:app', 
  'compile:client:copy', 
  'compile:client:html']
)

gulp.task('clean:server', function(){
  return del(['./server/build/**/*'])
})

function compileServer() {
  var tsProject = ts.createProject('server/tsconfig.json');
  
  return gulp.src(['./server/src/**/*.ts', './server/typings/**.ts'])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write({sourceRoot: function (file) {
      var sourceFile = path.join(file.cwd + '/build/', file.sourceMap.file);
      return path.relative(path.dirname(sourceFile), file.cwd) + '/src/';
    }}))
}

gulp.task('compile:server', ['clean:server'], function() {
  return compileServer()
    .pipe(gulp.dest('./server/build'))
});

gulp.task('compile:all', ['compile:server', 'compile:client']);

gulp.watch('client/app/**/*.scss', ['compile:client:sass']);
gulp.watch('client/app/**/*.ts', ['compile:client:app']);
gulp.watch('client/app/**/*.html', ['compile:client:html']);

// run server
gulp.task('server:start', ['compile:all'], function() {
  server.listen( { path: './server/bin/www', execArgv: ['--debug'] } );
});

gulp.task( 'server:restart', ['clean:server'], function() {
  var stream = compileServer()
               .pipe(gulp.dest('./server/build'))
               .pipe(server())
  return stream
});

gulp.task( 'default', ['server:start' ], function() {
    gulp.watch( './server/src/**/*.ts', [ 'server:restart' ] );
});