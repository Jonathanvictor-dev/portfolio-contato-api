import * as blockedEmailRepository from '../repositories/blocked-email.repository';

export async function blockEmail(email: string, reason: string) {
  const existingBlock = await blockedEmailRepository.findBlockedEmailByEmail(email);

  if (existingBlock) {
    throw new Error('Este email já está bloqueado');
  }

  return blockedEmailRepository.createBlockedEmail(email, reason);
}

export async function getAllBlockedEmails() {
  return blockedEmailRepository.findAllBlockedEmails();
}

export async function unblockEmail(id: string) {
  return blockedEmailRepository.deleteBlockedEmail(id);
}
