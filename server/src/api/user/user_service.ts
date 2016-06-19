import { UserData } from './user_data';
import { User } from './user_model';
import { Token } from './user_model';
import { AuthResult } from '../common/auth_result';
import * as crypto from 'crypto';

export class UserService{
  private _db: UserData
  constructor(db: UserData){
    this._db = db
  }
  
  public getUsers(): Promise<User[]>{
    return this._db.getUsers().then(users => {
      return users;
    });
  }
  
  public getUser(id: number): Promise<User>{
    return this._db.getUser(id).then(user => {      
      return user;
    });
  }
  
  public getUserByEmail(email: string): Promise<User>{
    return this._db.getUserByEmail(email).then(user => {
      return user;
    });
  }
  
  public createUser(user: User): Promise<Token>{    
    let salt = this.makeSalt();
    let encryptedPassword = this.encryptPassword(user.password, salt);
    user.salt = salt;
    user.password = encryptedPassword;
    user.provider = 'local';
    user.role = 'user';
    
    return this._db.createUser(user).then(id => {
      return {
        id: id[0],
        role: user.role
      };
    }); 
  }
  
  public destroyUser(id: number): Promise<void>{
    return this._db.destroyUser(id);
  }
  
  public updatePassword(id: number, oldPass: string, newPass: string): Promise<AuthResult>{
    return this.authenticateUserById(id, oldPass).then(authResult => {
      if(authResult.authenticated === true){
        let salt = this.makeSalt();
        let encryptedPassword = this.encryptPassword(newPass, salt);
        
        return this._db.updatePassword(authResult.user.id, encryptedPassword, salt).then(() => {
          return authResult;
        });
      } else {
        return authResult;
      }
    })
  }
  
  public authenticateUserByEmail(email: string, password: string): Promise<AuthResult>{
    return this.getUserByEmail(email).then(user => {
      return this.authenticateUser(user, password);
    });
  }
  
  public authenticateUserById(id: number, password: string): Promise<AuthResult>{
    return this.getUser(id).then(user => {
      return this.authenticateUser(user, password);
    });
  }
  
  private authenticateUser(user: User, password: string): AuthResult{
      let result = { user: null, data: null, authenticated: false}

      if (!user) {
        result.data = { email: 'This email is not registered.'};
      } else {
        let encryptedPassword = this.encryptPassword(password, user.salt);

        result.user = user;
        if (user.password === encryptedPassword){
          result.authenticated = true;
        } else {
          result.authenticated = false;
          result.data = { password: 'This password is not correct.' }
        } 
      }
      
      return result;
  }
  
  public userExists(params: Object): Promise<boolean> {
    return this._db.userExists(params);
  }

  private makeSalt(byteSize: number = 16): string{    
    return crypto.randomBytes(byteSize).toString('base64');
  }
  
  private encryptPassword(password: string, salt: string): string{
    if (!password || !salt) {
      return null;
    }
    
    let defaultIterations = 10000;
    let defaultKeyLength = 64;
    let base64Salt = new Buffer(salt, 'base64');

    return crypto.pbkdf2Sync(password, base64Salt, defaultIterations, defaultKeyLength, 'sha512')
                  .toString('base64');
  }
}