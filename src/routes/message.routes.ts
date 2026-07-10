import { Router } from 'express';
import * as messageController from '../controllers/message.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const messageRoutes = Router();

messageRoutes.post('/', messageController.create);

messageRoutes.get('/', authMiddleware, messageController.getAll);

messageRoutes.get('/:id', authMiddleware, messageController.getById);

messageRoutes.patch('/:id/read', authMiddleware, messageController.markAsRead);

messageRoutes.delete('/:id', authMiddleware, messageController.deleteMessage);

export default messageRoutes;
