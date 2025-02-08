import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";
import Google from "next-auth/providers/google";

export default {
  providers: [GitHub, Google],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/get-started",
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      const url = request.nextUrl;

      if (
        !url.pathname.includes("api") &&
        (url.pathname.includes("dashboard") || url.pathname.includes("notes"))
      ) {
        return !!auth;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
