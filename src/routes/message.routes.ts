import { Router } from 'express';
import * as messageController from '../controllers/message.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { MessageParams } from '../types/message.types';

const messageRoutes = Router();

messageRoutes.post('/', messageController.create);

messageRoutes.get('/', authMiddleware, messageController.getAll);

messageRoutes.get<MessageParams>('/:id', authMiddleware, messageController.getById);

messageRoutes.patch<MessageParams>('/:id/read', authMiddleware, messageController.markAsRead);

messageRoutes.delete<MessageParams>('/:id', authMiddleware, messageController.deleteMessage);

export default messageRoutes;
