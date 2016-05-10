'use strict';

// Declare app level module which depends on views, and components
angular.module('neighbormarketApp', [
  'ui.router',
  'ui.bootstrap',
  'neighbormarketApp.home',
  'neighbormarketApp.signup',
  'neighbormarketApp.navbar'
]).
config(['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
}]);
