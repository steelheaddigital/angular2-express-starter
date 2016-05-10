function userService (db){
  if (!db) {
    throw new Error('db is required');
  }
  
  var userService = {
    getUsers: getUsers
  }
  return userService;
  
  function getUsers(){
    return db.getUsers().then(rows => {
      return rows;
    });
  } 
}

module.exports = userService;