import 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon';
import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { AuthController } from './auth_controller';
import { AuthService } from './auth_service';
import { UserService } from '../user/user_service';
import { User, Token } from '../user/user_model';
import { NextFunction } from 'express';
import { AuthResult } from '../common/auth_result';
import { LocalAuth } from './local';

describe('User Controller', function() {
  describe('local method', function() {
    it('returns success and token on successful authentication', function(done) {
      let userService = <UserService><any>(sinon.mock(UserService));
      let authService: AuthService = new AuthService(userService);
      let localAuth = new LocalAuth(userService);

      sinon.stub(localAuth, 'setup', function (){
        passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password'
        }, function(email, password, done){
          let user = new User();
          return done(null, user)
        }));
      })

      sinon.stub(authService, 'signToken', function() {
        return 'TestToken';
      })
      
      let nextCalled = false;
      let next: NextFunction = () => {
        nextCalled = true;
      };
      let req: any = { body: {
        email: 'test@test.com',
        password: 'password'
      }};
      let res: any = { jsend: {
        success: function(data) {
          expect(data.token).to.equal('TestToken');
          done();
        }
      }};

      localAuth.setup();
      let authController = new AuthController(authService);

      authController.local(req, res, next);
    });

    it('fails with 401 if user is not successfuly authenticated', function(done) {
      let userService = <UserService><any>(sinon.mock(UserService));
      let authService: AuthService = new AuthService(userService);
      let localAuth = new LocalAuth(userService);

      sinon.stub(localAuth, 'setup', function (){
        passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password'
        }, function(email, password, done){
          let user = new User();
          return done(null, user)
        }));
      })

      let signTokenStub = sinon.stub(authService, 'signToken', function() {
        return 'TestToken';
      })
      
      let nextCalled = false;
      let next: NextFunction = () => {
        nextCalled = true;
      };
      let req: any = { };
      let res: any = { status: function(status) {
        expect(status).to.equal(401);
        //fails because no username or password is passed in with request
        return {
          jsend: {
            fail: function(info){
              expect(info).to.be.ok;
              done();
            }
          }
        }
      }};

      localAuth.setup();
      let authController = new AuthController(authService);

      authController.local(req, res, next);
    });

    it('fails with 401 if user is not successfuly authenticated', function(done) {
      let userService = <UserService><any>(sinon.mock(UserService));
      let authService: AuthService = new AuthService(userService);
      let localAuth = new LocalAuth(userService);

      sinon.stub(localAuth, 'setup', function (){
        passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password'
        }, function(email, password, done){
          let user = new User();
          return done(null, user)
        }));
      })

      sinon.stub(authService, 'signToken', function() {
        return 'TestToken';
      })
      
      let nextCalled = false;
      let next: NextFunction = () => {
        nextCalled = true;
      };
      let req: any = { };
      let res: any = { status: function(status) {
        expect(status).to.equal(401);
        //fails because no username or password is passed in with request
        return {
          jsend: {
            fail: function(info){
              expect(info).to.be.ok;
              done();
            }
          }
        }
      }};

      localAuth.setup();
      let authController = new AuthController(authService);

      authController.local(req, res, next);
    });

    it('fails with 404 if user is not found', function(done) {
      let userService = <UserService><any>(sinon.mock(UserService));
      let authService: AuthService = new AuthService(userService);
      let localAuth = new LocalAuth(userService);

      sinon.stub(localAuth, 'setup', function (){
        passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password'
        }, function(email, password, done){
          return done(null, null)
        }));
      })

      sinon.stub(authService, 'signToken', function() {
        return 'TestToken';
      })
      
      let nextCalled = false;
      let next: NextFunction = () => {
        nextCalled = true;
      };
      let req: any = { body: {
        email: 'test@test.com',
        password: 'password'
      }};
      let res: any = { status: function(status) {
        expect(status).to.equal(404);
        return {
          jsend: {
            error: function(message){
              expect(message).to.equal('Something went wrong, please try again.');
              done();
            }
          }
        }
      }};

      localAuth.setup();
      let authController = new AuthController(authService);

      authController.local(req, res, next);
    });
  });
});