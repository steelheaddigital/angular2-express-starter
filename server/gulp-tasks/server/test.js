"use strict";

const mocha = require('gulp-mocha');

module.exports = {
  dep: ['server:compile'],
  fn: function(gulp, basePath, callback) {
    process.env.NODE_ENV='test'
    return gulp.src([basePath + 'build/**/*spec.js'])
      .pipe(mocha());
  }
}