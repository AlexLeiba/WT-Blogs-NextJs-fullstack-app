import NextAuth from 'next-auth';
import Facebook from 'next-auth/providers/facebook';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { getToken } from 'next-auth/jwt';
import { prisma } from '@/prisma';

export async function getServerSession(req: Request) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  console.log('🚀 ~ getServerSession ~ token:\n\n\n', token);

  return token; // Contains the user's session data if authenticated
}

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
      clientId: process.env.AUTH_FACEBOOK_ID
        ? process.env.AUTH_FACEBOOK_ID
        : '',
      clientSecret: process.env.AUTH_FACEBOOK_SECRET
        ? process.env.AUTH_FACEBOOK_SECRET
        : '',
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ? process.env.AUTH_GOOGLE_ID : '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET
        ? process.env.AUTH_GOOGLE_SECRET
        : '',
    }),
  ],

  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      // On initial sign-in, store user info in the token
      if (account) {
        token.id = account.id;
        token.email = account.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add token info to session
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
