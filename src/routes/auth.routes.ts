import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const authRoutes = Router();

authRoutes.post('/login', authController.login);

authRoutes.patch('/password', authMiddleware, authController.changePassword);

export default authRoutes;
