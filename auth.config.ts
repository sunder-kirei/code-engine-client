import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma";

export default {
  providers: [GitHub],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/get-started",
  },
} satisfies NextAuthConfig;
