'use strict';

(function() {  
  angular.module('neighbormarketApp.navbar.navbar-controller', [])
  .controller('NavbarController', navbarController);
  
  function navbarController(){
    var vm = this;
    vm.isLoggedIn = function() { return false };  //Auth.isLoggedIn;
    vm.isAdmin = function() { return false }; //Auth.isAdmin;
    vm.getCurrentUser = function() { return { } }; ; //Auth.getCurrentUser;
    
    vm.menu = [{
      'title': 'Home',
      'state': 'home'
    }];
  }
  
})();
