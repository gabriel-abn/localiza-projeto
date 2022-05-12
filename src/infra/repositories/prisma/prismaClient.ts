import { PrismaClient } from "@prisma/client";

export const prismaClient = (): PrismaClient => {
  return new PrismaClient();
};
