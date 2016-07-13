import { User } from './user_model';
var db = require('../../../db/database');
var knex = require('knex');

export class UserData{
  public getUsers(): Promise<User[]>{
    return db.select().from('users').then(rows => {
      let userList: User[] = new User[rows.length];
      
      for (var i = 0; i < rows.length; i++) {
        let user = this.mapUser(rows[i]);
        userList.push(user);
      }
      
      return userList;
    });
  }

  public getUser(id: number): Promise<User>{
    return db('users').where('id', id).then(rows => {
      return this.mapUser(rows[0]);
    });
  }

  public getUserByEmail(email: string): Promise<User>{
    return db('users').where('email', email).then(rows => {
      return this.mapUser(rows[0]);
    });
  }

  public createUser(user: User): Promise<number[]>{
    return db('users')
      .insert({
        'name': user.name,
        'email': user.email,
        'role': user.role,
        'password': user.password,
        'salt': user.salt,
        'provider': user.provider
      })
  }

  public destroyUser(id: number): Promise<void>{
    return db('users')
      .where('id', id)
      .del();
  }

  public updatePassword(id: number, newPass: string, salt: string): Promise<void>{
    return db('users')
      .where('id', id)
      .update({
        'password': newPass,
        'salt': salt,
        'updated_at': new Date(new Date().getTime())
      });
  }

  public userExists(params: Object): Promise<boolean> {
    let subQuery = db('users').select().where(params);
    return db.select(db.raw(subQuery).wrap('exists (', ')')).then(rows => {
      return rows[0];
    })
  }
  
  private mapUser(row): User{
    if(row){
      var user = new User();
      user.id = row.id
      user.email = row.email
      user.password = row.password
      user.salt = row.salt
      user.name = row.name
      user.role = row.role
      user.provider = row.provider
      user.facebook = row.facebook
      
      return user; 
    } else {
      return null;
    }
  }
}