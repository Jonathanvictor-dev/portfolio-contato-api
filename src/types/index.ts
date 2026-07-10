import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
      token?: string;
    }
  }
}

export * from './auth.types';
export * from './message.types';
export * from './blocked-email.types';
