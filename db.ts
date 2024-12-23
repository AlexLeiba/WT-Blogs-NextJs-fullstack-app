import { PrismaClient } from '@prisma/client';

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export const db = global.prismaGlobal || new PrismaClient(); //store in a global variable to work on both server and client side

if (process.env.NODE_ENV !== 'production') global.prismaGlobal = db;
