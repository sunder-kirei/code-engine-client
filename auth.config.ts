import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {},
      authorize: async () => {
        const user = await prisma.user.create({
          data: {},
        });

        if (!user) {
          throw new Error("Failed to create user");
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/get-started",
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      const url = request.nextUrl;

      if (
        !url.pathname.includes("api") &&
        (url.pathname.includes("dashboard") ||
          url.pathname.includes("notes") ||
          url.pathname.includes("profile") ||
          url.pathname.includes("codes") ||
          url.pathname.includes("new"))
      ) {
        return !!auth;
      }

      return true;
    },
    session: ({ session, token }) => {
      session.user.id = token.sub ?? "";
      return session;
    },
  },
  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signOut: async (message: any) => {
      if (message.token.email === null) {
        const user = await prisma.user.findUnique({
          where: {
            id: message.token.sub,
          },
          include: {
            CodeFiles: true,
            Notes: true,
          },
        });
        if (user) {
          await prisma.codeFiles.deleteMany({
            where: {
              id: {
                in: user.CodeFiles.map((c) => c.id),
              },
            },
          });
          await prisma.notes.deleteMany({
            where: {
              id: {
                in: user.Notes.map((c) => c.id),
              },
            },
          });
          await prisma.user.delete({
            where: {
              id: message.token.sub,
            },
          });
        }
      }
    },
  },
} satisfies NextAuthConfig;
