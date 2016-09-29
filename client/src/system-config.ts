"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular/core': 'vendor/@angular/core/bundles/core.umd.js',
  '@angular/common': 'vendor/@angular/common/bundles/common.umd.js',
  '@angular/compiler': 'vendor/@angular/compiler/bundles/compiler.umd.js',
  '@angular/platform-browser': 'vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
  '@angular/platform-browser-dynamic': 'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
  '@angular/http': 'vendor/@angular/http/bundles/http.umd.js',
  '@angular/router': 'vendor/@angular/router/bundles/router.umd.js',
  '@angular/forms': 'vendor/@angular/forms/bundles/forms.umd.js',
  'moment': 'vendor/moment/moment.js',
  'angular2-jwt': 'vendor/angular2-jwt/angular2-jwt.js',
  'ng2-bootstrap': 'vendor/ng2-bootstrap',
  'crypto-js': 'vendor/crypto-js/crypto-js.js',
  'typemoq': 'vendor/typemoq/typemoq.js',
  'underscore': 'vendor/underscore/underscore.js'
};

/** User packages configuration. */
const packages: any = {
  'moment':{
    format: 'cjs'
  },
  'angular2-jwt':{
    format: 'cjs'
  },
  'ng2-bootstrap': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'ng2-bootstrap.js'
  },
  'crypto-js':{
    format: 'cjs'
  },
  'typemoq':{
    format: 'cjs'
  },
  'underscore':{
    format: 'cjs'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/auth/login',
  'app/shared/navbar',
  'app/home',
  'app/user/signup',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
