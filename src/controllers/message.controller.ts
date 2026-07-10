import { Request, Response } from 'express';
import * as messageService from '../services/message.service';
import { CreateMessageRequest, MessageParams } from '../types/message.types';

export async function create(req: Request<{}, {}, CreateMessageRequest>, res: Response): Promise<void> {
  try {
    const { name, email, content } = req.body;

    const message = await messageService.createMessage({
      name,
      email,
      content,
    });

    res.status(201).json({
      message: 'Mensagem enviada com sucesso',
      data: message,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

    const statusCode = errorMessage === 'Este email está bloqueado' ? 403 : 400;

    res.status(statusCode).json({
      message: errorMessage,
    });
  }
}

export async function getAll(_req: Request, res: Response): Promise<void> {
  try {
    const messages = await messageService.getAllMessages();

    res.status(200).json({
      message: 'Mensagens listadas com sucesso',
      data: messages,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(500).json({
      message,
    });
  }
}

export async function getById(req: Request<MessageParams>, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const message = await messageService.getMessageById(id);

    res.status(200).json({
      message: 'Mensagem obtida com sucesso',
      data: message,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    const statusCode = message === 'Mensagem não encontrada' ? 404 : 500;

    res.status(statusCode).json({
      message,
    });
  }
}

export async function markAsRead(req: Request<MessageParams>, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await messageService.markAsRead(id);

    res.status(200).json({
      message: 'Mensagem marcada como lida',
      data: {},
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    const statusCode = message === 'Mensagem não encontrada' ? 404 : 400;

    res.status(statusCode).json({
      message,
    });
  }
}

export async function deleteMessage(req: Request<MessageParams>, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await messageService.deleteMessageById(id);

    res.status(200).json({
      message: 'Mensagem deletada com sucesso',
      data: {},
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    const statusCode = message === 'Mensagem não encontrada' ? 404 : 500;

    res.status(statusCode).json({
      message,
    });
  }
}
