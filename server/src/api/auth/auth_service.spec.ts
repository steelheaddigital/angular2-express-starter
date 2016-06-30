import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { AuthService } from './auth_service';
import { UserService } from '../user/user_service';
import { Token } from '../user/user_model';
import * as jwt from 'jsonwebtoken';
let config = require('../../../config');

describe('Auth Service', function() {

  describe('signToken method', function() {
    it('returns signed token', function() {
      let token: Token = {
        id: 1,
        role: 'user'
      }
      let userService: UserService = <UserService><any>(sinon.mock(AuthService));
      let authService = new AuthService(userService);

      let result = jwt.verify(authService.signToken(token), config.sessionSecret);

      expect(result.id).to.equal(1);
    })
  })

});