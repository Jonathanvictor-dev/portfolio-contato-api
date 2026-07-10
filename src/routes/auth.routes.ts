import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { changePasswordSchema, loginSchema } from '../validations/request.schemas';

const authRoutes = Router();

authRoutes.post('/login', validate(loginSchema), authController.login);

authRoutes.patch('/password', authMiddleware, validate(changePasswordSchema), authController.changePassword);

export default authRoutes;
