'use strict';

(function() {

  angular.module('neighbormarketApp.navbar.navbar-directive', [])
  .directive('navbar', navbar);
  
  function navbar(){
    return {
      templateUrl: 'app/components/navbar/navbar.html',
      restrict: 'E',
      controller: 'NavbarController',
      controllerAs: 'nav'
    };
  }
  
})();
