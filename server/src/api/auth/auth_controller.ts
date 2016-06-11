import * as express from "express"
import * as passport from 'passport';
import { AuthService } from './auth_service';

export class AuthController{
  private _authService: AuthService
  constructor(authService: AuthService){
    this._authService = authService;
  }
  
  public local = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { 
        return next(err); 
      }
      if (info) {
        return res.status(401).jsend.fail(info);
      }
      if (!user) {
        return res.status(404).jsend.error('Something went wrong, please try again.');
      }
      var token = this._authService.signToken(user.token());
      res.jsend.success({ token });
    })(req, res, next)
  };
}



