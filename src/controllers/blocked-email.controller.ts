import { Request, Response } from 'express';
import * as blockedEmailService from '../services/blocked-email.service';
import { BlockEmailRequest, BlockedEmailParams } from '../types/blocked-email.types';

export async function block(req: Request<{}, {}, BlockEmailRequest>, res: Response): Promise<void> {
  try {
    const { email, reason } = req.body;

    const blockedEmail = await blockedEmailService.blockEmail(email, reason);

    res.status(201).json({
      message: 'E-mail bloqueado com sucesso',
      data: blockedEmail,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    const statusCode = message === 'Este e-mail já está bloqueado' ? 409 : 400;

    res.status(statusCode).json({
      message,
    });
  }
}

export async function getAll(_req: Request, res: Response): Promise<void> {
  try {
    const blockedEmails = await blockedEmailService.getAllBlockedEmails();

    if (blockedEmails.length === 0) {
      res.status(200).json({
        message: 'Nenhum e-mail bloqueado encontrado',
      });
      return;
    };

    res.status(200).json({
      message: 'E-mails bloqueados listados com sucesso',
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
    const { email } = req.params;

    await blockedEmailService.unblockEmail(email);

    res.status(200).json({
      message: 'E-mail desbloqueado com sucesso',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    const statusCode = message === 'E-mail bloqueado não encontrado' ? 404 : 400;

    res.status(statusCode).json({
      message,
    });
  }
}
