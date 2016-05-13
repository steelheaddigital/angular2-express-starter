var express = require('express');
var router = express.Router();
var db = require('../domain/user/user_data');

import { UserService } from '../domain/user/user_service'
import { UserData } from '../domain/user/user_data'
let userService = new UserService(new UserData())

/* GET users listing. */
router.get('/', function(req, res, next) {
  userService.getUsers().then(users => {
    res.json(users);
  })
});

module.exports = router;
