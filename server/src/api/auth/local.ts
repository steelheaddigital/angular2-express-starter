import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import { UserService } from '../user/user_service';
import { AuthResult } from '../common/auth_result';

export class LocalAuth {
  private _userService: UserService
  constructor(userService){
    this._userService = userService
  }
  
  public setup = () => {
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, this.localAuthenticate));
  }
  
  private localAuthenticate = (email, password, done) => {
    return this._userService.authenticateUserByEmail(email, password)
      .then(result => {
        if (!result.authenticated) {
          return done(null, false, result.data);
        } else {
          return done(null, result.user);
        }
      })
      .catch(err => done(err));
  }
} 
