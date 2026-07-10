import { prisma } from '../lib/prisma';

export async function createBlockedEmail(email: string, reason: string) {
  return prisma.blockedEmail.create({
    data: { email, reason },
  });
}

export async function findBlockedEmailByEmail(email: string) {
  return prisma.blockedEmail.findUnique({
    where: { email },
  });
}

export async function findAllBlockedEmails() {
  return prisma.blockedEmail.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function deleteBlockedEmail(email: string) {
  return prisma.blockedEmail.delete({
    where: { email },
  });
}
