"use strict";

module.exports = {
  deps: ['client:compile'],
  fn: function(gulp, basePath, callback){
    let spawn = require('child_process').spawn;
    let child = spawn('xvfb-run', ['ng', 'test'], {
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