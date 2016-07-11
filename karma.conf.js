module.exports = function(config){
  config.set({

    basePath : './client',
    
    autoWatch : true,

    frameworks: ['jspm', 'mocha'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-jspm'
    ],
    
    jspm: {
      config: 'jspm.config.js',
      loadFiles: [ 'app/**/*.spec.ts' ],
      serveFiles: [ 'app/**/*!(*.spec).ts']
    },
    
    proxies: {
        '/app/': '/base/app/',
        '/jspm_packages/': '/base/jspm_packages/'
    }

  });
};
