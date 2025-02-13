import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let type = request.nextUrl.searchParams.get("type");
  if (type !== "code" && type !== "note") {
    type = "note";
  }

  const session = await auth();

  if (!session?.user || !session.user.email) {
    redirect(`/get-started?callbackUrl=/new?type=${type}`);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
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
          email: session.user.email,
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
            email: session.user.email ?? "",
          },
        },
      },
    });

    redirect(`/notes/${note.id}`);
  } else {
    const codeCount = await prisma.codeFiles.count({
      where: {
        creator: {
          email: session.user.email,
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
        language: user.UserPreferences?.defaultLanguage ?? "javascript",
        creator: {
          connect: {
            email: session.user.email ?? "",
          },
        },
      },
    });

    redirect(`/codes/${codeFile.id}`);
  }
}
