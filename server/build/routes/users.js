"use strict";
var express = require('express');
var router = express.Router();
var db = require('../domain/user/user_data');
const user_service_1 = require('../domain/user/user_service');
const user_data_1 = require('../domain/user/user_data');
let userService = new user_service_1.UserService(new user_data_1.UserData());
/* GET users listing. */
router.get('/', function (req, res, next) {
    userService.getUsers().then(users => {
        res.json(users);
    });
});
module.exports = router;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM5QixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUU3QywrQkFBNEIsNkJBQzVCLENBQUMsQ0FEd0Q7QUFDekQsNEJBQXlCLDBCQUN6QixDQUFDLENBRGtEO0FBQ25ELElBQUksV0FBVyxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLG9CQUFRLEVBQUUsQ0FBQyxDQUFBO0FBRWpELHdCQUF3QjtBQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUNyQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoicm91dGVzL3VzZXJzLmpzIiwic291cmNlUm9vdCI6Ii9Wb2x1bWVzL0RhdGEvVXNlcnMvdG9tL1Byb2plY3RzL05laWdoYm9ybWFya2V0Ml9FeHByZXNzL3NlcnZlciJ9
