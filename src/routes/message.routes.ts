import { Router } from 'express';
import * as messageController from '../controllers/message.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { MessageParams } from '../types/message.types';
import { createMessageSchema, idParamsSchema } from '../validations/request.schemas';

const messageRoutes = Router();

messageRoutes.post('/', validate(createMessageSchema), messageController.create);

messageRoutes.get('/', authMiddleware, messageController.getAll);

messageRoutes.get<MessageParams>('/:id', validate(idParamsSchema, 'params'), authMiddleware, messageController.getById);

messageRoutes.patch<MessageParams>('/:id/read', validate(idParamsSchema, 'params'), authMiddleware, messageController.markAsRead);

messageRoutes.delete<MessageParams>('/:id', validate(idParamsSchema, 'params'), authMiddleware, messageController.deleteMessage);

export default messageRoutes;
