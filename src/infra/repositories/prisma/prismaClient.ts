import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
export const prismaClient = global.prisma || new PrismaClient();
