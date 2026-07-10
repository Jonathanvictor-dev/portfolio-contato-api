import * as blockedEmailRepository from '../repositories/blocked-email.repository';

export async function blockEmail(email: string, reason: string) {
  const existingBlock = await blockedEmailRepository.findBlockedEmailByEmail(email);

  if (existingBlock) {
    throw new Error('Este e-mail já está bloqueado');
  }

  return blockedEmailRepository.createBlockedEmail(email, reason);
}

export async function getAllBlockedEmails() {
  return blockedEmailRepository.findAllBlockedEmails();
}

export async function unblockEmail(email: string) {
  const existingBlock = await blockedEmailRepository.findBlockedEmailByEmail(email);

  if (!existingBlock) {
    throw new Error('E-mail bloqueado não encontrado');
  }

  return blockedEmailRepository.deleteBlockedEmail(email);
}
