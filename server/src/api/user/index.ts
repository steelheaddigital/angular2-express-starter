import * as express from 'express';
import { UserController } from './user_controller';
import { UserService } from './user_service';
import { UserData } from './user_data';
import { User } from './user_model';
import { AuthService } from '../auth/auth_service';

var router = express.Router();

var userService = new UserService(new UserData());
var authService = new AuthService(userService);
var userController = new UserController(userService, authService);

router.get('/', authService.hasRole('admin'), userController.index);
router.delete('/:id', authService.hasRole('admin'), userController.destroy);
router.get('/me', authService.isAuthenticated(), userController.me);
router.put('/password', authService.isAuthenticated(), userController.updatePassword);
router.get('/:id(\\d+)', authService.isAuthenticated(), userController.show);
router.post('/', userController.create);
router.get('/exists', userController.exists);

module.exports = router;
