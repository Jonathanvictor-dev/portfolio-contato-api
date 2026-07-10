import { prisma } from '../lib/prisma';

export async function createAuthSession(
  userId: string,
  token: string,
  expiresAt: Date
) {
  return prisma.authSession.create({
    data: { userId, token, expiresAt },
  });
}

export async function findValidAuthSession(token: string, userId: string) {
  return prisma.authSession.findFirst({
    where: {
      token,
      userId,
      expiresAt: { gt: new Date() },
    },
  });
}

export async function deleteAuthSession(token: string) {
  return prisma.authSession.delete({
    where: { token },
  });
}
