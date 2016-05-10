var db = require('../../db/database');

exports.getUsers = function() {
    return db.select().from('users');
}