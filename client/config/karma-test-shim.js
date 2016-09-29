// Test shim for Karma, needed to load files via SystemJS

/*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {
};

var distPath = '/base/dist/';
var appPaths = ['app']; //Add all valid source code folders here

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return path.slice(-8) == '.spec.js';
}

function isAppFile(path) {
  return isJsFile(path) && appPaths.some(function(appPath) {
    var fullAppPath = distPath + appPath + '/';
    return path.substr(0, fullAppPath.length) == fullAppPath;
  });
}

var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isAppFile);

// Load our SystemJS configuration.
System.config({
  baseURL: distPath,

  // Extend usual application package list with test folder
  packages: { 'testing': { main: 'index.js', defaultExtension: 'js' } },

  // Assume npm: is set in `paths` in systemjs.config
  // Map the angular testing umd bundles
  map: {
    '@angular/core/testing': 'vendor/@angular/core/bundles/core-testing.umd.js',
    '@angular/common/testing': 'vendor/@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'vendor/@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'vendor/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http/testing': 'vendor/@angular/http/bundles/http-testing.umd.js',
    '@angular/router/testing': 'vendor/@angular/router/bundles/router-testing.umd.js',
    '@angular/forms/testing': 'vendor/@angular/forms/bundles/forms-testing.umd.js',
},
});

System.import('system-config.js').then(function() {
  // Load and configure the TestComponentBuilder.
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ]).then(function (providers) {
    var testing = providers[0];
    var testingBrowser = providers[1];

    testing.TestBed.initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting());  
  });
}).then(function() {
  // Finally, load all spec files.
  // This will run the tests directly.
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      return System.import(moduleName);
    }));
}).then(__karma__.start, __karma__.error);
