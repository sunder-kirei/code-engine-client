import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let type = request.nextUrl.searchParams.get("type");
  if (type !== "code" && type !== "note") {
    type = "note";
  }

  const session = await auth();

  if (!session?.user) {
    redirect(`/get-started?callbackUrl=/new?type=${type}`);
  }

  if (type === "note") {
    const note = await prisma.notes.create({
      data: {
        creator: {
          connect: {
            email: session.user.email ?? "",
          },
        },
      },
    });

    redirect(`/notes/${note.id}`);
  } else {
    const codeFile = await prisma.codeFiles.create({
      data: {
        creator: {
          connect: {
            email: session.user.email ?? "",
          },
        },
      },
    });

    redirect(`/code/${codeFile.id}`);
  }
}
