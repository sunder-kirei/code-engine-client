import { auth } from "@/auth";
import { putNoteSchema } from "@/schema/zod";
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
  { params }: { params: Promise<{ noteID: string }> }
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
  if (!p || !p.noteID) {
    return Response.json(
      { error: "Invalid noteID" },
      {
        status: 400,
      }
    );
  }

  const note = await prisma.notes.findUnique({
    where: {
      id: p.noteID,
      creator: {
        email: session.user.email,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!note) {
    return Response.json({ error: "Note not found" }, { status: 404 });
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
  { params }: { params: Promise<{ noteID: string }> }
) {
  const reqBody = putNoteSchema.safeParse(await request.json());

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
  if (!p || !p.noteID) {
    return Response.json({ error: "Invalid noteID" }, { status: 400 });
  }

  const note = await prisma.notes.findUnique({
    where: {
      id: p.noteID,
      creator: {
        email: session.user.email,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!note) {
    return Response.json({ error: "Note not found" }, { status: 404 });
  }

  const updatedNote = await prisma.notes.update({
    where: {
      id: p.noteID,
      creator: {
        email: session.user.email,
      },
    },
    data: {
      content: reqBody.data.content,
      title: reqBody.data.title,
    },
  });

  return Response.json(updatedNote, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(
  request: NextApiRequest,
  { params }: { params: Promise<{ noteID: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const p = await params;
  if (!p || !p.noteID) {
    return Response.json({ error: "Invalid noteID" }, { status: 400 });
  }

  const note = await prisma.notes.findUnique({
    where: {
      id: p.noteID,
      creator: {
        email: session.user.email,
      },
    },
    include: {
      creator: true,
    },
  });

  if (!note) {
    return Response.json({ error: "Note not found" }, { status: 404 });
  }

  if (note.creator.email !== session.user.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.notes.delete({
    where: {
      id: p.noteID,
      creator: {
        email: session.user.email,
      },
    },
  });

  return Response.json({ message: "Note deleted" }, { status: 204 });
}
