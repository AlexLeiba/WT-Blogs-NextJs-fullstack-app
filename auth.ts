import NextAuth from 'next-auth';
import Facebook from 'next-auth/providers/facebook';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ? process.env.AUTH_GITHUB_ID : '',
      clientSecret: process.env.AUTH_GITHUB_SECRET
        ? process.env.AUTH_GITHUB_SECRET
        : '',
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ? process.env.AUTH_GOOGLE_ID : '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET
        ? process.env.AUTH_GOOGLE_SECRET
        : '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export async function getServerSession() {
  const token = await auth();

  return token; // Contains the user's session data if authenticated
}
