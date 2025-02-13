import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { putUserProfileSchema } from "@/schema/zod";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user || !session.user.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      UserPreferences: true,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH(request: NextRequest) {
  const reqBody = putUserProfileSchema.safeParse(await request.json());

  if (reqBody.success === false) {
    return Response.json(
      { error: reqBody.error },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const session = await auth();

  if (!session?.user || !session.user.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const user = await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      name: reqBody.data.name,
      image: reqBody.data.image,
      UserPreferences: {
        defaultLanguage: reqBody.data.defaultLanguage,
        darkModeEnabled: reqBody.data.darkModeEnabled,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      UserPreferences: true,
    },
  });

  return NextResponse.json(user);
}
