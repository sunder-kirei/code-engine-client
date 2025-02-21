import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Language } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let type = request.nextUrl.searchParams.get("type");
  if (type !== "code" && type !== "note") {
    type = "note";
  }

  const session = await auth();

  if (!session?.user) {
    redirect(`/get-started?callbackUrl=/new?type=${type}`);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email ?? undefined,
      id: session.user.id,
    },
    select: {
      id: true,
      UserPreferences: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (type === "note") {
    const noteCount = await prisma.notes.count({
      where: {
        creator: {
          email: session.user.email ?? undefined,
          id: session.user.id,
        },
      },
    });

    if (noteCount > 15) {
      return NextResponse.json(
        { error: "You have reached the limit of 15 notes" },
        { status: 400 }
      );
    }

    const note = await prisma.notes.create({
      data: {
        creator: {
          connect: {
            email: session.user.email ?? undefined,
            id: session.user.id,
          },
        },
      },
    });

    redirect(`/notes/${note.id}`);
  } else {
    const codeCount = await prisma.codeFiles.count({
      where: {
        creator: {
          email: session.user.email ?? undefined,
          id: session.user.id,
        },
      },
    });

    if (codeCount > 15) {
      return NextResponse.json(
        { error: "You have reached the limit of 15 code files" },
        { status: 400 }
      );
    }

    const codeFile = await prisma.codeFiles.create({
      data: {
        language: user.UserPreferences?.defaultLanguage ?? Language.JAVASCRIPT,
        creator: {
          connect: {
            email: session.user.email ?? undefined,
            id: session.user.id,
          },
        },
      },
    });

    redirect(`/codes/${codeFile.id}`);
  }
}
