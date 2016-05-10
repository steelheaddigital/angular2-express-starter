'use strict';

angular.module('neighbormarketApp.signup', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'app/signup/signup.html',
    controller: 'SignupController'
  });
}])

.controller('SignupController', [function() {

}]);