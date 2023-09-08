import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const clearRecoveryAttempts = async (user: any) => {
  await prisma.recoveryRequest.deleteMany({
    where: {
      email: user.email,
    },
  });
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      recoveryAttempts: 0,
    },
  });
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 3 * 60 * 60, // 3 hours
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "magic-flea-market@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                nickname: true,
              },
            },
            password: true,
            plan: true,
          },
        });

        if (!existingUser) {
          return null;
        }

        const isPasswordMatch = await compare(
          credentials?.password,
          existingUser.password
        );

        if (!isPasswordMatch) {
          return null;
        }

        if (isPasswordMatch) {
          // Any object returned will be saved in `user` property of the JWT
          const user = {
            id: existingUser.id,
            email: existingUser.email,
            plan: existingUser.plan,
            nickname: existingUser.profile?.nickname,
          };
          await clearRecoveryAttempts(existingUser);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const { sub: id } = token;
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          username: true,
          profile: {
            select: {
              nickname: true,
            },
          },
          plan: true,
        },
      });
      session.user = user as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
