import { prisma } from '../lib/prisma';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(id: string, data: { email?: string; password?: string }) {
  return prisma.user.update({
    where: { id },
    data,
  });
}
