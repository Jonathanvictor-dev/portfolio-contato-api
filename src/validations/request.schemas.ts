import { z } from 'zod';

const requiredString = (field: string) =>
  z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${field} \u00e9 obrigat\u00f3rio`
          : `${field} deve ser um texto`,
    })
    .trim()
    .min(1, `${field} \u00e9 obrigat\u00f3rio`);

const email = requiredString('Email').email('Email inv\u00e1lido');

export const createMessageSchema = z.object({
  name: requiredString('Nome'),
  email,
  content: requiredString('Mensagem'),
});

export const blockEmailSchema = z.object({
  email,
  reason: requiredString('Motivo do bloqueio'),
});

export const loginSchema = z.object({
  email,
  password: requiredString('Senha'),
});

export const changePasswordSchema = z.object({
  currentPassword: requiredString('Senha atual'),
  newPassword: requiredString('Nova senha'),
});

export const idParamsSchema = z.object({
  id: requiredString('ID').uuid('ID inv\u00e1lido'),
});
