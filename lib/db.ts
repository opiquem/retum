import { PrismaClient } from '@prisma/client';

declare global {
  var prismaClient: PrismaClient | undefined;
}

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalThis.prisma = db;
// }


export const db = createPrismaClient();

function createPrismaClient(): PrismaClient {
  if (!globalThis.prismaClient || process.env.NODE_ENV !== 'production') {
    globalThis.prismaClient = new PrismaClient({
      log: [{ emit: 'stdout', level: 'query' }],
    });
  }

  return globalThis.prismaClient;
}