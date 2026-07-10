import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { LoginRequest, ChangePasswordRequest } from '../types/auth.types';

export async function login(req: Request<{}, {}, LoginRequest>, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    res.status(200).json({
      message: 'Login realizado com sucesso',
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(401).json({
      message,
    });
  }
}

export async function changePassword(req: Request<{}, {}, ChangePasswordRequest>, res: Response): Promise<void> {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      res.status(401).json({
        message: 'Usuário não autenticado',
      });
      return;
    }

    await authService.changePassword({
      userId,
      currentPassword,
      newPassword,
    });

    res.status(200).json({
      message: 'Senha alterada com sucesso',
      data: {},
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(400).json({
      message,
    });
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  try {
    await authService.logout();

    res.status(200).json({
      message: 'Logout realizado com sucesso'
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';

    res.status(500).json({
      message,
    });
  }
}
