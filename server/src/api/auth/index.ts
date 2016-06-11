import * as express from "express"
import { AuthService } from './auth_service';
import { LocalAuth } from './local';
import { AuthController } from './auth_controller';
import { UserData } from '../user/user_data';
import { UserService } from '../user/user_service';

let authService = new AuthService(new UserService(new UserData()));
let authController = new AuthController(authService);
var localAuth = new LocalAuth(new UserService(new UserData()));

//Passport Configuration
localAuth.setup()

var router = express.Router();

router.post('/local', authController.local);

module.exports = router;
