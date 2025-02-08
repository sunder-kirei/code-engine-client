import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await prisma.notes.findMany({
    where: {
      creator: {
        email: session.user.email,
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
    },
  });

  return Response.json(notes, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
