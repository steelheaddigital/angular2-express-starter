var db = require('../../../db/database');

export class UserData{
    getUsers(){
        return db.select().from('users');
    }
}