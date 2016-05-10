'use strict';

angular.module('neighbormarketApp.home', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'app/home/home.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', ['$http', function($http) {
    $http.get('/users').then(function(response){
      console.log(response.data);
    });
}]);