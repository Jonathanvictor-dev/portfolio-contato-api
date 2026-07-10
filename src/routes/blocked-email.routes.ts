import { Router } from 'express';
import * as blockedEmailController from '../controllers/blocked-email.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const blockedEmailRoutes = Router();

blockedEmailRoutes.post('/', authMiddleware, blockedEmailController.block);

blockedEmailRoutes.get('/', authMiddleware, blockedEmailController.getAll);

blockedEmailRoutes.delete('/:id', authMiddleware, blockedEmailController.unblock);

export default blockedEmailRoutes;
