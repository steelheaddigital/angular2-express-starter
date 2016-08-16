import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import { UserService } from '../user/user_service';
import { Token } from '../user/user_model';
let config = require('../../../config');
let compose = require('composable-middleware');

let validateJwt = expressJwt({
  secret: config.sessionSecret
});

export class AuthService {
  private _userService: UserService
  constructor(userService: UserService){
    this._userService = userService
  }
  
  public signToken(token: Token) {
    return jwt.sign(token, config.sessionSecret, {
      expiresIn: "45m"
    });
  }
  
  public isAuthenticated() {
    var userService = this._userService
    return compose()
      
      // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function(req, res, next) {
        userService.getUser(req.user.id)
          .then(user => {
            if (!user) {
              return res.status(401).end();
            }
            req.user = user;
            next();
          })
          .catch(err => next(err));
      });
  }
  
  public hasRole(roleRequired) {
    if (!roleRequired) {
      throw new Error('Required role needs to be set');
    }

    return compose()
      .use(this.isAuthenticated())
      .use(function(req, res, next) {
        if (config.userRoles.indexOf(req.user.role) >=
            config.userRoles.indexOf(roleRequired)) {
          next();
        } else {
          res.status(403).end();
        }
      });
  }
}