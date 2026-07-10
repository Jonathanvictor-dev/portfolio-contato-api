import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as authSessionRepository from '../repositories/auth-session.repository';

interface TokenPayload {
  id: string;
  email: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      message: 'Token não fornecido',
    });
    return;
  }

  const token = authHeader.slice(7);
  const jwtSecret = process.env.JWT_SECRET || 'chave-secreta-padrao';

  try {
    const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
    const session = await authSessionRepository.findValidAuthSession(
      token,
      decoded.id
    );

    if (!session) {
      res.status(401).json({
        message: 'Token inv\u00e1lido ou expirado',
      });
      return;
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Token inválido ou expirado',
    });
  }
};
