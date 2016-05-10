'use strict';

describe('User Service', function() {

  var mockDb = {
    getUsers: function() {
      var promise = new Promise(function(resolve, reject){
        resolve({id: 1, name: 'Test'})
      })

      return promise
    }
  }
  var userService = require('../../domain/user/user_service')(mockDb)

  it('getUsers() returns correct result', function(done) {
    userService.getUsers().then(function(result) {
      expect(result.id).toBe(1);
      expect(result.name).toBe('Test');
      done();
    });
  });
  
});