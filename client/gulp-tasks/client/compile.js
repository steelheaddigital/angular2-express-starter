"use strict";

module.exports = {
  dep: ['client:clean'],
  fn: function(gulp, basePath, callback){
    let spawn = require('child_process').spawn;
    let child = spawn('ng', ['build'], {
        "cwd": basePath
    });

    child.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    child.stderr.on('data', function(data) {
        console.log('ERROR: ' + data);
    });

    child.on('exit', callback);
  }
}