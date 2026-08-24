import { normalizeEmail } from '../lib/utils/emailUtils';
import * as blockedEmailRepository from '../repositories/blocked-email.repository';

export async function blockEmail(email: string, reason: string) {

  const existingBlock = await blockedEmailRepository.findBlockedEmailByEmail(normalizeEmail(email));

  if (existingBlock) {
    throw new Error('Este e-mail já está bloqueado');
  }

  return blockedEmailRepository.createBlockedEmail(normalizeEmail(email), reason);
}

export async function getAllBlockedEmails() {
  return blockedEmailRepository.findAllBlockedEmails();
}

export async function unblockEmail(email: string) {
  const existingBlock = await blockedEmailRepository.findBlockedEmailByEmail(normalizeEmail(email));

  if (!existingBlock) {
    throw new Error('E-mail bloqueado não encontrado');
  }

  return blockedEmailRepository.deleteBlockedEmail(normalizeEmail(email));
}
