import 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon';
import { UserService } from './user_service'
import { UserData } from './user_data'
import { User } from './user_model';

describe('User Service', function() {

  describe('getUser method', function() {
    it('returns correct User', function() {
      let userData = new UserData();
      sinon.stub(userData, "getUser", function(id: number) {
        var promise = new Promise(function(resolve, reject){
          resolve({id: id, name: 'Test'})
        })

        return promise
      });
      
      let userService = new UserService(userData);
    
      return userService.getUser(1).then(result =>  {
        expect(result.id).to.equal(1);
        expect(result.name).to.equal('Test');
      });
    });
  })
  
  describe('getUsers method', function() {
    it('returns correct array of User', function() {
      let userData = new UserData();
      sinon.stub(userData, "getUsers", function() {
        var promise = new Promise(function(resolve, reject){
          resolve([{id: 1, name: 'Test1'}, {id: 2, name: 'Test2'}])
        })

        return promise
      });
      
      let userService = new UserService(userData);
    
      return userService.getUsers().then(result =>  {
        expect(result.length).to.equal(2);
        expect(result[0].id).to.equal(1);
        expect(result[0].name).to.equal('Test1');
        expect(result[1].id).to.equal(2);
        expect(result[1].name).to.equal('Test2');
      });
    });
  })

  describe('getUserByEmail method', function() {
    it('returns correct User', function() {
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
    
      return userService.getUserByEmail('TestEmail').then(result => {
        expect(result.id).to.equal(1);
        expect(result.email).to.equal('TestEmail');
      });
    })
  });
  
  describe('createUser method', function() {
    it('creates user and returns Token', function() {
      let userData = new UserData();

      let stub = sinon.stub(userData, "createUser", function() {
        var promise = new Promise<number>(function(resolve, reject){
          resolve(1);
        })

        return promise
      });

      let userService = new UserService(userData);
      let user = new User();
      
      return userService.createUser(user).then(result => {
        expect(result.id).to.equal(1);
        expect(result.role).to.equal('user');
        expect(stub.calledWith(sinon.match.has('provider', 'local'))).to.equal(true);
        expect(stub.calledWith(sinon.match.has('role', 'user'))).to.equal(true);
      })
    });
  });

  describe('updatePassword method', function() {
    it('updates password if user is authenticated', function() {
      let userData = new UserData();
      let user = new User();
      user.id = 1;
      user.password = 'QGcQMzm+zoVI7nkj7eAmIZOkwRJYLqstMt9zha3g37tZKkz71wknyjES+MEhyVwn0I+j2HJqwQbppc1Zs6iJiA=='
      user.salt = 'm6Uvh+RZEdq/xCE8Nz2Bjw=='

      let getUserStub = sinon.stub(userData, "getUser", function() {
        var promise = new Promise<User>(function(resolve, reject){
          resolve(user);
        })
        return promise
      });

      let updatePasswordStub = sinon.stub(userData, "updatePassword", function() {
        var promise = new Promise<void>(function(resolve, reject){
          resolve();
        })
        return promise
      });

      let userService = new UserService(userData);
      
      return userService.updatePassword(1, '12345', '67890').then(result => {
        expect(result.user.id).to.equal(1);
        expect(updatePasswordStub.calledWith(1)).to.equal(true);
      })
    });

    it('does not update password if user is not authenticated', function() {
      let userData = new UserData();
      let user = new User();
      user.id = 1;
      user.password = 'QGcQMzm+zoVI7nkj7eAmIZOkwRJYLqstMt9zha3g37tZKkz71wknyjES+MEhyVwn0I+j2HJqwQbppc1Zs6iJiA=='
      user.salt = 'm6Uvh+RZEdq/xCE8Nz2Bjw=='

      let getUserStub = sinon.stub(userData, "getUser", function() {
        var promise = new Promise<User>(function(resolve, reject){
          resolve(user);
        })
        return promise
      });

      let updatePasswordStub = sinon.stub(userData, "updatePassword", function() {
        var promise = new Promise<void>(function(resolve, reject){
          resolve();
        })
        return promise
      });

      let userService = new UserService(userData);
      
      return userService.updatePassword(1, '123456', '67890').then(result => {
        expect(result.user.id).to.equal(1);
        expect(updatePasswordStub.calledWith(1)).to.equal(false);
        expect(result.data['password']).to.equal('This password is not correct.')
      })
    });
  });

  describe('authenticateUserByEmail method', function() {
    it('authenticates user if email exists and password is correct', function() {
      let userData = new UserData();
      let user = new User();
      user.id = 1; 
      user.password = 'QGcQMzm+zoVI7nkj7eAmIZOkwRJYLqstMt9zha3g37tZKkz71wknyjES+MEhyVwn0I+j2HJqwQbppc1Zs6iJiA=='
      user.salt = 'm6Uvh+RZEdq/xCE8Nz2Bjw=='

      let getUserStub = sinon.stub(userData, "getUserByEmail", function() {
        var promise = new Promise<User>(function(resolve, reject){
          resolve(user);
        })
        return promise
      });

      let userService = new UserService(userData);
      
      return userService.authenticateUserByEmail('test@test.com', '12345').then(result => {
        expect(result.authenticated).to.equal(true);
        expect(result.user).to.equal(user);
      })
    });

    it('does not authenticate user if email exists and password is not correct', function() {
      let userData = new UserData();
      let user = new User();
      user.id = 1; 
      user.password = 'QGcQMzm+zoVI7nkj7eAmIZOkwRJYLqstMt9zha3g37tZKkz71wknyjES+MEhyVwn0I+j2HJqwQbppc1Zs6iJiA=='
      user.salt = 'm6Uvh+RZEdq/xCE8Nz2Bjw=='

      let getUserStub = sinon.stub(userData, "getUserByEmail", function() {
        var promise = new Promise<User>(function(resolve, reject){
          resolve(user);
        })
        return promise
      });

      let userService = new UserService(userData);
      
      return userService.authenticateUserByEmail('test@test.com', '123456').then(result => {
        expect(result.authenticated).to.equal(false);
        expect(result.user).to.equal(user);
        expect(result.data['password']).to.equal('This password is not correct.')
      })
    });

    it('does not authenticate user if user does not exist', function() {
      let userData = new UserData();

      let getUserStub = sinon.stub(userData, "getUserByEmail", function() {
        var promise = new Promise<User>(function(resolve, reject){
          resolve(null);
        })
        return promise
      });

      let userService = new UserService(userData);
      
      return userService.authenticateUserByEmail('test@test.com', '123456').then(result => {
        expect(result.authenticated).to.equal(false);
        expect(result.user).to.equal(null);
        expect(result.data['email']).to.equal('This email is not registered.')
      })
    });
  });
  
  describe('authenticateUserById method', function() {
    it('authenticates user if email exists and password is correct', function() {
      let userData = new UserData();
      let user = new User();
      user.id = 1; 
      user.password = 'QGcQMzm+zoVI7nkj7eAmIZOkwRJYLqstMt9zha3g37tZKkz71wknyjES+MEhyVwn0I+j2HJqwQbppc1Zs6iJiA=='
      user.salt = 'm6Uvh+RZEdq/xCE8Nz2Bjw=='

      let getUserStub = sinon.stub(userData, "getUser", function() {
        var promise = new Promise<User>(function(resolve, reject){
          resolve(user);
        })
        return promise
      });

      let userService = new UserService(userData);
      
      return userService.authenticateUserById(1, '12345').then(result => {
        expect(result.authenticated).to.equal(true);
        expect(result.user).to.equal(user);
      })
    });

    it('does not authenticate user if email exists and password is not correct', function() {
      let userData = new UserData();
      let user = new User();
      user.id = 1; 
      user.password = 'QGcQMzm+zoVI7nkj7eAmIZOkwRJYLqstMt9zha3g37tZKkz71wknyjES+MEhyVwn0I+j2HJqwQbppc1Zs6iJiA=='
      user.salt = 'm6Uvh+RZEdq/xCE8Nz2Bjw=='

      let getUserStub = sinon.stub(userData, "getUser", function() {
        var promise = new Promise<User>(function(resolve, reject){
          resolve(user);
        })
        return promise
      });

      let userService = new UserService(userData);
      
      return userService.authenticateUserById(1, '123456').then(result => {
        expect(result.authenticated).to.equal(false);
        expect(result.user).to.equal(user);
        expect(result.data['password']).to.equal('This password is not correct.')
      })
    });

    it('does not authenticate user if user does not exist', function() {
      let userData = new UserData();

      let getUserStub = sinon.stub(userData, "getUser", function() {
        var promise = new Promise<User>(function(resolve, reject){
          resolve(null);
        })
        return promise
      });

      let userService = new UserService(userData);
      
      return userService.authenticateUserById(1, '123456').then(result => {
        expect(result.authenticated).to.equal(false);
        expect(result.user).to.equal(null);
        expect(result.data['email']).to.equal('This email is not registered.')
      })
    });
  });

});
