import { UserData } from './user_data'

export class UserService {
  _db: UserData
  constructor(db){
    if (!db) {
      throw new Error('db is required');
    }
    
    this._db = db
  }
  
  getUsers(){
    return this._db.getUsers().then(rows => {
      return rows;
    });
  }
}