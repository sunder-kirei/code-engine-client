import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { queryNotesSchema } from "@/schema/zod";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = queryNotesSchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams)
  );

  if (params.success === false) {
    return Response.json(
      { error: params.error },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const notes = await prisma.notes.findMany({
    where: {
      creator: {
        email: session.user.email,
      },
      title: {
        contains: params.data.title,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return Response.json(notes, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
