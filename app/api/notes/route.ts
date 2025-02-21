import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { getAllNotesSchema } from "@/schema/zod";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = getAllNotesSchema.safeParse(
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

  if (params.data.page) params.data.page--;

  const notes = await prisma.notes.findMany({
    where: {
      creator: {
        email: session.user.email ?? undefined,
        id: session.user.id,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      imageURL: true,
    },
    skip: (params.data.page ?? 0) * (params.data.limit ?? 10),
    take: params.data.limit,
  });

  return Response.json(notes, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
