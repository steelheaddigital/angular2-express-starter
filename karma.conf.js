module.exports = function(config){
  config.set({

    basePath : './client',
    
    autoWatch : true,

    frameworks: ['jspm', 'mocha'],

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-jspm'
    ],
    
    jspm: {
      loadFiles: [ 'app/**/*.spec.ts' ],
      serveFiles: [ 'app/**/*!(*.spec).ts']
    },
    
    proxies: {
        '/app/': '/base/app/',
        '/jspm_packages/': '/base/jspm_packages/'
    }

  });
};
