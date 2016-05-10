var express = require('express');
var router = express.Router();
var db = require('../domain/user/user_data');
var userService = require('../domain/user/user_service')(db)

/* GET users listing. */
router.get('/', function(req, res, next) {
  userService.getUsers().then(users => {
    res.json(users);
  })
});

module.exports = router;
