process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var gulp = require('gulp');
var knex = require('./db/database');
var args = require('minimist')(process.argv.slice(2));
var jasmineNode = require('gulp-jasmine-node');
var KarmaServer = require('karma').Server;

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

gulp.task('test:server', function () {
    return gulp.src(['spec/**/*spec.js']).pipe(jasmineNode({
        timeout: 10000
    }));
});

gulp.task('test:ui', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});