import { Request, Response } from 'express';
import * as blockedEmailService from '../services/blocked-email.service';
import { BlockEmailRequest, BlockedEmailParams } from '../types/blocked-email.types';

export async function block(req: Request<{}, {}, BlockEmailRequest>, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    const blockedEmail = await blockedEmailService.blockEmail(email);

    res.status(201).json({
      message: 'Email bloqueado com sucesso',
      data: blockedEmail,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    const statusCode = message === 'Este email já está bloqueado' ? 409 : 400;

    res.status(statusCode).json({
      message,
    });
  }
}

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const blockedEmails = await blockedEmailService.getAllBlockedEmails();

    res.status(200).json({
      message: 'Emails bloqueados listados com sucesso',
      data: blockedEmails,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(500).json({
      message,
    });
  }
}

export async function unblock(req: Request<BlockedEmailParams>, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    await blockedEmailService.unblockEmail(id);

    res.status(200).json({
      message: 'Email desbloqueado com sucesso',
      data: {},
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(400).json({
      message,
    });
  }
}
