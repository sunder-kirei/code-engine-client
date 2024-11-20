import { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';

export default {
  providers: [GitHub],
  pages: {
    signIn: '/get-started',
  },
} satisfies NextAuthConfig;
