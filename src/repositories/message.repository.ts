import { prisma } from '../lib/prisma';

export async function createMessage(data: { name: string; email: string; content: string }) {
  return prisma.message.create({
    data,
  });
}

export async function findAllMessages() {
  return prisma.message.findMany({
    include: {
      read: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findMessageById(id: string) {
  return prisma.message.findUnique({
    where: { id },
    include: {
      read: true,
    },
  });
}

export async function deleteMessage(id: string) {
  return prisma.message.delete({
    where: { id },
  });
}

export async function markMessageAsRead(messageId: string) {
  return prisma.messageRead.create({
    data: {
      messageId,
    },
  });
}
