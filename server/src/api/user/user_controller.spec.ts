import 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon';
import { UserController } from './user_controller';
import { AuthService } from '../auth/auth_service';
import { UserService } from './user_service'
import { UserData } from './user_data'
import { User, Token } from './user_model';
import { NextFunction } from 'express';
import { AuthResult } from '../common/auth_result';

describe('User Controller', function() {
  describe('index method', function() {
    it('returns correct Array of User', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService: AuthService = <AuthService><any>(sinon.mock(AuthService));

      sinon.stub(userService, "getUsers", function() {
        var promise = new Promise(function(resolve, reject){
          resolve([{id: 1, name: 'Test1'}, {id: 2, name: 'Test2'}])
        })

        return promise
      });
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data.length).to.equal(2);
          expect(data[0].name).to.equal('Test1');
          expect(data[1].name).to.equal('Test2');
          done();
        }
      }};

      let userController = new UserController(userService, authService);

      userController.index(req, res, next);
    });
  });

  describe('destroy method', function() {
    it('destroys specified user', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService: AuthService = <AuthService><any>(sinon.mock(AuthService));

      let destroyUserStub = sinon.stub(userService, "destroyUser", function() {
        var promise = new Promise(function(resolve, reject){
          resolve()
        })

        return promise
      });
      
      let next: NextFunction;
      let req: any = { params: { id: 1} };
      let res: any = { status: function(status) {
          expect(status).to.equal(204);
          done();
        }
      };

      let userController = new UserController(userService, authService);

      userController.destroy(req, res, next);
      expect(destroyUserStub.calledWith(1)).to.be.ok;
    });
  });

  describe('me method', function() {
    it('gets specified user and returns success if user is logged in', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService: AuthService = <AuthService><any>(sinon.mock(AuthService));

      let getUserStub = sinon.stub(userService, "getUser", function() {
        var promise = new Promise(function(resolve, reject){
          resolve({id: 1, name: "Me"});
        })

        return promise
      });
      
      let next: NextFunction;
      let req: any = { user: { id: 1 } };
      let res: any = { jsend: {
        success: function(data) {
          expect(data.name).to.equal('Me');
          expect(data.id).to.equal(1);
          done();
        }
      }};

      let userController = new UserController(userService, authService);

      userController.me(req, res, next);
      expect(getUserStub.calledWith(1)).to.be.ok;
    });

    it('returns 401 if no user is found', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService: AuthService = <AuthService><any>(sinon.mock(AuthService));

      let getUserStub = sinon.stub(userService, "getUser", function() {
        var promise = new Promise(function(resolve, reject){
          resolve(null);
        })

        return promise
      });
      
      let next: NextFunction;
      let req: any = { user: { id: 1 } };
      let res: any = { status: function(status) {
          expect(status).to.equal(401);
          done();
        }
      };

      let userController = new UserController(userService, authService);

      userController.me(req, res, next);
      expect(getUserStub.calledWith(1)).to.be.ok;
    });
  });

  describe('updatePassword method', function() {
    it('updates password if user is authenticated', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService: AuthService = <AuthService><any>(sinon.mock(AuthService));

      let updatePasswordStub = sinon.stub(userService, "updatePassword", function() {
        var promise = new Promise(function(resolve, reject){
          let authResult = {
            authenticated: true
          }
          resolve(authResult);
        })

        return promise
      });
      
      let next: NextFunction;
      let req: any = { user: { 
          id: 1 
        }, 
          body: {
            oldPassword: 'oldPassword',
            newPassword: 'newPassword'
        } 
      };
      let res: any = { status: function(status) {
          expect(status).to.equal(204);
          done();
        }
      };

      let userController = new UserController(userService, authService);

      userController.updatePassword(req, res, next);
      expect(updatePasswordStub.calledWith(1, 'oldPassword', 'newPassword')).to.be.ok;
    });

    it('returns 403 if user is not authenticated', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService: AuthService = <AuthService><any>(sinon.mock(AuthService));

      let updatePasswordStub = sinon.stub(userService, "updatePassword", function() {
        var promise = new Promise(function(resolve, reject){
          let authResult = {
            authenticated: false
          }
          resolve(authResult);
        })

        return promise
      });
      
      let next: NextFunction;
      let req: any = { user: { 
          id: 1 
        }, 
          body: {
            oldPassword: 'oldPassword',
            newPassword: 'newPassword'
        } 
      };
      let res: any = { status: function(status) {
          expect(status).to.equal(403);
          done();
        }
      };

      let userController = new UserController(userService, authService);

      userController.updatePassword(req, res, next);
      expect(updatePasswordStub.calledWith(1, 'oldPassword', 'newPassword')).to.be.ok;
    });
  });

  describe('show method', function() {
    it('returns specified user profile if user is found', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService: AuthService = <AuthService><any>(sinon.mock(AuthService));

      let getUserStub = sinon.stub(userService, "getUser", function() {
        var promise = new Promise(function(resolve, reject){
          let user = new User()
          user.id = 1;
          user.name = 'User1';
          user.role = 'user';
          resolve(user);
        })

        return promise
      });
      
      let next: NextFunction;
      let req: any = { params: { id: 1 } };
      let res: any = { jsend: {
        success: function(data) {
          expect(data.role).to.equal('user');
          expect(data.name).to.equal('User1');
          done();
        }
      }};

      let userController = new UserController(userService, authService);

      userController.show(req, res, next);
      expect(getUserStub.calledWith(1)).to.be.ok;
    });

    it('returns 404 and correct message if no user is found', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService: AuthService = <AuthService><any>(sinon.mock(AuthService));

      let getUserStub = sinon.stub(userService, "getUser", function() {
        var promise = new Promise(function(resolve, reject){
          resolve(null);
        })

        return promise
      });
      
      let next: NextFunction;
      let req: any = { params: { id: 1 } };
      let res: any = { status: function(status) {
        expect(status).to.equal(404);
        return { jsend: {
          fail: function(message) {
            expect(message).to.equal('User not found');
            done();
          }
        }}
      }};

      let userController = new UserController(userService, authService);

      userController.show(req, res, next);
      expect(getUserStub.calledWith(1)).to.be.ok;
    });
  });

  describe('create method', function() {
    it('creates user and returns auth token', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService = new AuthService(userService);

      let createUserStub = sinon.stub(userService, "createUser", function() {
        var promise = new Promise(function(resolve, reject){
          let token: Token = {
            id: 1,
            role: 'user'
          }
          resolve(token);
        })

        return promise
      });

      let signTokenStub = sinon.stub(authService, 'signToken', function() {
        return 'TestToken';
      })
      
      let next: NextFunction;
      let req: any = { body: { email: 'User1@test.com', name: 'User1', password: '12345' } };
      let res: any = { jsend: {
        success: function(data) {
          expect(data.token).to.equal('TestToken');
          done();
        }
      }};

      let userController = new UserController(userService, authService);

      userController.create(req, res, next);
      expect(createUserStub.calledWith(sinon.match.has('email', 'User1@test.com'))).to.be.ok;
      expect(createUserStub.calledWith(sinon.match.has('name', 'User1'))).to.be.ok;
      expect(createUserStub.calledWith(sinon.match.has('password', '12345'))).to.be.ok;
    });
  });

  describe('exists method', function() {
    it('returns success and true if user exists', function(done) {
      let userData: UserData = <UserData><any>(sinon.mock(UserData));
      let userService = new UserService(userData);
      let authService: AuthService = <AuthService><any>(sinon.mock(AuthService));

      let existsStub = sinon.stub(userService, "userExists", function() {
        var promise = new Promise(function(resolve, reject){
          resolve(true);
        })

        return promise
      });
      
      let next: NextFunction;
      let req: any = { query: { email: 'Test1@test.com' } };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(true);
          done();
        }
      }};

      let userController = new UserController(userService, authService);

      userController.exists(req, res, next);
      expect(existsStub.calledWith(sinon.match.has('email', 'Test1@test.com'))).to.be.ok;
    });
  });
})