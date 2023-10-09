import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidations } from './auth.validations';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidations.create),
  AuthController.createUser
);
router.post(
  '/signin',
  validateRequest(AuthValidations.login),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshToken),
  AuthController.refreshToken
);
router.delete(
  '/logout',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  AuthController.logoutUser
);
export const AuthRoutes = router;
