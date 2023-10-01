// Prisma adapter for NextAuth, optional and can be removed
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter"
import { Redis } from "@upstash/redis"

import { env } from '../../../env/server.mjs';

const redis = new Redis({
  url: env.UPSTASH_REDIS_URL,
  token: env.UPSTASH_REDIS_TOKEN
})

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session: async ({ session, user}) => {
      session.jwt = user.jwt;
      session.id = user.id;
      return Promise.resolve(session);
    },
    jwt: async ({token, user, account}) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const url = `${env.NEXT_PUBLIC_API_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}`
        const response = await fetch(url);
        const data = await response.json();
        token.id = data.user.id;
        token.jwt = data.jwt;
      }
      return Promise.resolve(token);
    },
  },
  adapter: UpstashRedisAdapter(redis),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
  ],
  // session: { strategy: "jwt" }
};

export default NextAuth(authOptions);