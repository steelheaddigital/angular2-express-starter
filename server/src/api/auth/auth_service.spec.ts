import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { AuthService } from './auth_service';
import { UserService } from '../user/user_service';
import { UserData } from '../user/user_data';
import { Token } from '../user/user_model';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
let config = require('../../../config');

describe('Auth Service', function() {

  describe('signToken method', function() {
    it('returns signed token', function() {
      let token: Token = {
        id: 1,
        role: 'user'
      }
      let userService: UserService = <UserService><any>(sinon.mock(UserService));
      let authService = new AuthService(userService);

      let result = jwt.verify(authService.signToken(token), config.sessionSecret);

      expect(result.id).to.equal(1);
      expect(result.role).to.equal('user');
    });
  });

  describe('isAuthenticated method', function() {
    it('validates jwt and adds user to request if authenticated', function(done) {
      let userService = new UserService(new UserData());

      sinon.stub(userService, "getUser", function(userId) {
        var promise = new Promise(function(resolve, reject){
          if(userId != null && userId !== undefined && userId === 1)
            resolve({id: 1, name: 'Test1'})
          else
            resolve(null);
        })

        return promise
      });
      
      let token: Token = {
        id: 1,
        role: 'user'
      }
      let signedToken = jwt.sign(token, config.sessionSecret);

      let req: any = {
        headers: {
          authorization: 'Bearer ' + signedToken
        }
      };
      let res: any = { };
      let authService = new AuthService(userService);

      let middleware = authService.isAuthenticated();

      middleware(req, res, (error) => {
        if (error) { throw new Error(error); }
        expect(req.user.id).to.equal(1);
        expect(req.user.name).to.equal('Test1');
        done();
      });
    });

    it('sets response status to 401 if jwt is not valid', function(done) {
      let userService = new UserService(new UserData());

      sinon.stub(userService, "getUser", function(userId) {
        var promise = new Promise(function(resolve, reject){
          if(userId != null && userId !== undefined && userId === 1)
            resolve({id: 1, name: 'Test1'})
          else
            resolve(null);
        })

        return promise
      });
      
      let token: Token = {
        id: 1,
        role: 'user'
      }
      //Sign the token with a different secret to make it invalid
      let signedToken = jwt.sign(token, "12345");

      let req: any = {
        headers: {
          authorization: 'Bearer ' + signedToken
        }
      };
      let res: any = { status: function(status) {
        expect(status).to.equal(401)
      }};
      let authService = new AuthService(userService);

      let middleware = authService.isAuthenticated();

      middleware(req, res, (error) => {
        expect(error.message).to.equal('invalid signature')
        expect(req.user).to.be.undefined
        done();
      });
    });
  });

  describe('hasRole method', function() {
    it('completes execution if user is authenticated and has the required role', function(done) {
      let userService = new UserService(new UserData());

      sinon.stub(userService, "getUser", function(userId) {
        var promise = new Promise(function(resolve, reject){
          if(userId != null && userId !== undefined && userId === 1)
            resolve({id: 1, name: 'Test1', role: 'admin'})
          else
            resolve(null);
        })

        return promise
      });
      
      let token: Token = {
        id: 1,
        role: 'user'
      }
      let signedToken = jwt.sign(token, config.sessionSecret);

      let req: any = {
        headers: {
          authorization: 'Bearer ' + signedToken
        }
      };
      let res: any = { };
      let authService = new AuthService(userService);

      let middleware = authService.hasRole('admin');

      middleware(req, res, error => {
        if (error) { throw new Error(error); }
        done();
      })
    });

    it('sets response status to 403 if user does not have the required role', function(done) {
      let userService = new UserService(new UserData());

      sinon.stub(userService, "getUser", function(userId) {
        var promise = new Promise(function(resolve, reject){
          if(userId != null && userId !== undefined && userId === 1)
            resolve({id: 1, name: 'Test1', role: 'user'})
          else
            resolve(null);
        })

        return promise
      });
      
      let token: Token = {
        id: 1,
        role: 'user'
      }
      let signedToken = jwt.sign(token, config.sessionSecret);

      let req: any = {
        headers: {
          authorization: 'Bearer ' + signedToken
        }
      };
      let res: any = { status: function(status) {
        expect(status).to.equal(403)
        done();
      }};
      let authService = new AuthService(userService);

      let middleware = authService.hasRole('admin');

      middleware(req, res, error => {
        if (error) { throw new Error(error); }
        done();
      })
    });
  });

});