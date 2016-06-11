import 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon';
import { UserService } from './user_service'
import { UserData } from './user_data'
import { User } from './user_model';

describe('User Service', function() {
  it('getUser() returns correct User', function(done) {
    let userData = new UserData();
    sinon.stub(userData, "getUser", function(id: number) {
      var promise = new Promise(function(resolve, reject){
        resolve({id: id, name: 'Test'})
      })

      return promise
    });
    
    let userService = new UserService(userData);
  
    userService.getUser(1).then(function(result) {
      expect(result.id).to.equal(1);
      expect(result.name).to.equal('Test');
      done();
    });
  });
  
  it('getUsers() returns correct correct array of User', function(done) {
    let userData = new UserData();
    sinon.stub(userData, "getUsers", function() {
      var promise = new Promise(function(resolve, reject){
        resolve([{id: 1, name: 'Test1'}, {id: 2, name: 'Test2'}])
      })

      return promise
    });
    
    let userService = new UserService(userData);
  
    userService.getUsers().then(function(result) {
      expect(result.length).to.equal(2);
      expect(result[0].id).to.equal(1);
      expect(result[0].name).to.equal('Test1');
      expect(result[1].id).to.equal(2);
      expect(result[1].name).to.equal('Test2');
      done();
    });
  });
  
  it('getUserByEmail() returns correct User', function(done) {
    let userData = new UserData();
    sinon.stub(userData, "getUserByEmail", function() {
      var promise = new Promise<User>(function(resolve, reject){
        var user = new User()
        user.id = 1,
        user.email = 'TestEmail'
        resolve(user)
      })

      return promise
    });
    
    let userService = new UserService(userData);
  
    userService.getUserByEmail('TestEmail').then(function(result) {
      expect(result.id).to.equal(1);
      expect(result.email).to.equal('TestEmail');
      done();
    });
  });
  
});
