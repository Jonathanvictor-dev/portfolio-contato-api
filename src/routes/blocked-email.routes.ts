import { Router } from 'express';
import * as blockedEmailController from '../controllers/blocked-email.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { BlockedEmailParams } from '../types/blocked-email.types';
import { blockEmailSchema, blockedEmailParamsSchema } from '../validations/request.schemas';

const blockedEmailRoutes = Router();

blockedEmailRoutes.post('/', authMiddleware, validate(blockEmailSchema), blockedEmailController.block);

blockedEmailRoutes.get('/', authMiddleware, blockedEmailController.getAll);

blockedEmailRoutes.delete<BlockedEmailParams>(
  '/:email',
  authMiddleware,
  validate(blockedEmailParamsSchema, 'params'),
  blockedEmailController.unblock
);

export default blockedEmailRoutes;
