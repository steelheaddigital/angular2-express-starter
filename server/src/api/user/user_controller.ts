import { Request, Response, NextFunction } from 'express';
import { UserService } from './user_service';
import { UserData } from './user_data';
import { User } from './user_model';
import { AuthService } from '../auth/auth_service';
var jsend = require('jsend');

export class UserController{
  private _userService: UserService;
  private _authService: AuthService;
  constructor(userService: UserService, authService: AuthService){
    this._userService = userService;
    this._authService = authService;
  }

  /* GET users listing. */
  public index = (req: Request, res: Response, next: NextFunction) => {
    this._userService.getUsers().then(users => {
      res.jsend.success(users);
    })
    .catch(next);
  };

  /* DELETE specifiec user */
  public destroy = (req: Request, res: Response, next: NextFunction) => {
    this._userService.destroyUser(req.params.id).then(() => {
      res.status(204).end();
    })
    .catch(next);
  };

  /* GET my info. */
  public me = (req: Request, res: Response, next: NextFunction) => {
    this._userService.getUser(req.user.id).then(user => {
      if(!user){
        return res.status(401).end();
      }
      res.jsend.success(user);
    })
    .catch(next);
  };

  /* PUT update password */
  public updatePassword = (req: Request, res: Response, next: NextFunction) => {
    let userId = req.user.id;
    let oldPass = String(req.body.oldPassword);
    let newPass = String(req.body.newPassword);
    
    this._userService.updatePassword(req.user.id, oldPass, newPass).then(authResult => {
      if(authResult.authenticated === true){
        res.status(204).end();
      } else {
        res.status(403).end();
      }
    })
    .catch(next);
  };

  /* GET specified user info */
  public show = (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.id
    
    this._userService.getUser(userId).then(user => {
      if(!user){
        return res.status(404).jsend.fail('User not found');
      }
      res.jsend.success(user.profile());
    })
    .catch(next);
  };

  /* POST create user */
  public create = (req: Request, res: Response, next: NextFunction) => {
    let user = new User();
    user.email = req.body.email;
    user.name = req.body.name;
    user.password = req.body.password;
    
    this._userService.createUser(user).then(authToken => {
      console.log(authToken)
      let token = this._authService.signToken(authToken);
      res.jsend.success({ token })
    })
    .catch(next);
  };

  /* GET exists */
  public exists = (req: Request, res: Response, next: NextFunction) => {
    let params = req.query;
    this._userService.userExists(params).then(exists => {
      res.jsend.success(exists);
    })
    .catch(next)
  }
}
