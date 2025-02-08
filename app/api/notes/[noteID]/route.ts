import { auth } from "@/auth";
import { putNoteSchema } from "@/lib/zod";
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

  const { noteID } = await params;
  if (!noteID) {
    return Response.json(
      { error: "Invalid noteID" },
      {
        status: 400,
      }
    );
  }

  const note = await prisma.notes.findUnique({
    where: {
      id: noteID,
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

export async function PUT(
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

  const { noteID } = await params;
  if (!noteID) {
    return Response.json({ error: "Invalid noteID" }, { status: 400 });
  }

  const note = await prisma.notes.findUnique({
    where: {
      id: noteID,
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
      id: noteID,
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

export async function DELETE(request: NextApiRequest) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(
    `http://${process.env.HOST ?? "localhost"}${request.url}`
  );
  const noteID = url.searchParams.get("noteID");
  if (!noteID) {
    return Response.json({ error: "Invalid noteID" }, { status: 400 });
  }

  const note = await prisma.notes.findUnique({
    where: {
      id: noteID,
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
      id: noteID,
    },
  });

  return Response.json({ message: "Note deleted" }, { status: 204 });
}
