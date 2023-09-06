import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
 
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
