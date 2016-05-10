module.exports = function(config){
  config.set({

    basePath : 'public/',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/home/**/*.js',
      'app/signup/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['mocha'],

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-mocha'
    ]
  });
};
