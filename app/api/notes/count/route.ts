import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const count = await prisma.notes.count({
    where: {
      creatorId: session.user.id,
    },
  });

  return Response.json(count, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
