import * as messageRepository from '../repositories/message.repository';
import * as blockedEmailRepository from '../repositories/blocked-email.repository';
import { CreateMessageRequest } from '../types/message.types';
import { normalizeEmail } from '../lib/utils/emailUtils';

export async function createMessage(data: CreateMessageRequest) {
  const email = normalizeEmail(data.email);

  const blockedEmail = await blockedEmailRepository.findBlockedEmailByEmail(email);

  if (blockedEmail) {
    throw new Error('Este email está bloqueado para o envio de mensagens');
  }

  return messageRepository.createMessage({ ...data, email: email });
}

export async function getAllMessages() {
  return messageRepository.findAllMessages();
}

export async function getMessageById(id: string) {
  const message = await messageRepository.findMessageById(id);

  if (!message) {
    throw new Error('Mensagem não encontrada');
  }

  return message;
}

export async function markAsRead(messageId: string) {
  const message = await messageRepository.findMessageById(messageId);

  if (!message) {
    throw new Error('Mensagem não encontrada');
  }

  if (message.read) {
    throw new Error('Mensagem já foi lida');
  }

  return messageRepository.markMessageAsRead(messageId);
}

export async function deleteMessageById(id: string) {
  const message = await messageRepository.findMessageById(id);

  if (!message) {
    throw new Error('Mensagem não encontrada');
  }

  return messageRepository.deleteMessage(id);
}
