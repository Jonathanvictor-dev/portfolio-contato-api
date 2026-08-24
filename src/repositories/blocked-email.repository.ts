import { prisma } from '../lib/prisma';

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function createBlockedEmail(email: string, reason: string) {
  return prisma.blockedEmail.create({
    data: { email: normalizeEmail(email), reason },
  });
}

export async function findBlockedEmailByEmail(email: string) {
  return prisma.blockedEmail.findUnique({
    where: { email: normalizeEmail(email) },
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
    where: { email: normalizeEmail(email) },
  });
}
