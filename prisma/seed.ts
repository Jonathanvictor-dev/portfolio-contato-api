import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL e ADMIN_PASSWORD devem estar definidos.");
  };

  const adminExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (adminExists) {
    console.log("Admin já existe.");
    return;
  };

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });

  console.log("Admin criado com sucesso.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });