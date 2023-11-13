import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { env } from "@/env.mjs";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
    async signIn({ profile}: any) {
      const { email, name, picture } = profile;

      // Check if the user already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Update the existing user profile (if needed)
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { username: name, picture },
        });

        return true;
      }

      // If the user doesn't exist, create a new user
      await prisma.user.create({
        data: {
          username: name,
          email,
          picture,
        },
      });

      return true;
    },
  } as any,
});
