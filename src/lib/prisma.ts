import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "production")
  globalForPrisma.prisma = prisma;

/* 
  You can extend Prisma Client using a Prisma Client extension by appending the $extends client method when instantiating Prisma Client as follows:

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    result: {
      user: {
        fullName: {
          needs: { firstName: true, lastName: true },
          compute(user) {
            return `${user.firstName} ${user.lastName}`
          },
        },
      },
    },
  })
} 


After creating this file, you can now import the extended PrismaClient instance anywhere in your Next.js pages as follows:

// e.g. in `pages/index.tsx`
import prisma from './db'

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany()

  return { props: { posts } }
}
*/
