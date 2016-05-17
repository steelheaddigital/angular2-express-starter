import 'mocha'
import { expect } from 'chai'
import { UserService } from '../../domain/user/user_service'

describe('User Service', function() {

  var mockDb = {
    getUsers: function() {
      var promise = new Promise(function(resolve, reject){
        resolve({id: 1, name: 'Test'})
      })

      return promise
    }
  }
  var userService = new UserService(mockDb);

  it('getUsers() returns correct result', function(done) {
    userService.getUsers().then(function(result) {
      expect(result.id).to.equal(1);
      expect(result.name).to.equal('Test');
      done();
    });
  });
  
});