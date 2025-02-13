import { auth } from "@/auth";
import { putCodeSchema } from "@/schema/zod";
import { prisma } from "@/prisma";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export const config = {
  api: {
    bodyparser: {
      sizeLimit: "10mb",
    },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ codeID: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  const p = await params;
  if (!p || !p.codeID) {
    return Response.json(
      { error: "Invalid codeID" },
      {
        status: 400,
      }
    );
  }

  const note = await prisma.codeFiles.findUnique({
    where: {
      id: p.codeID,
      creator: {
        email: session.user.email,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      language: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!note) {
    return Response.json({ error: "Code not found" }, { status: 404 });
  }

  return Response.json(note, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ codeID: string }> }
) {
  const reqBody = putCodeSchema.safeParse(await request.json());

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
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const p = await params;
  if (!p || !p.codeID) {
    return Response.json({ error: "Invalid codeID" }, { status: 400 });
  }

  const note = await prisma.codeFiles.findUnique({
    where: {
      id: p.codeID,
      creator: {
        email: session.user.email,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      language: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!note) {
    return Response.json({ error: "Code not found" }, { status: 404 });
  }

  const updatedCode = await prisma.codeFiles.update({
    where: {
      id: p.codeID,
    },
    data: {
      content: reqBody.data.content,
      title: reqBody.data.title,
      language: reqBody.data.language,
    },
  });

  return Response.json(updatedCode, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(
  request: NextApiRequest,
  { params }: { params: Promise<{ codeID: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const p = await params;
  if (!p || !p.codeID) {
    return Response.json({ error: "Invalid codeID" }, { status: 400 });
  }

  const code = await prisma.codeFiles.findUnique({
    where: {
      id: p.codeID,
    },
    include: {
      creator: true,
    },
  });

  if (!code) {
    return Response.json({ error: "Code not found" }, { status: 404 });
  }

  if (code.creator.email !== session.user.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.codeFiles.delete({
    where: {
      id: p.codeID,
    },
  });

  return Response.json({ message: "Code deleted" }, { status: 204 });
}
