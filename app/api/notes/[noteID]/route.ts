import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { putNoteSchema } from "@/schema/zod";
import { NextRequest } from "next/server";

import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyparser: {
      sizeLimit: "1mb",
    },
  },
};

const deleteImage = async (imageURL: string | undefined | null) => {
  if (!imageURL) return;

  const publicID = "notes" + "/" + imageURL.split("/").pop()?.split(".")[0];
  if (publicID) await cloudinary.uploader.destroy(publicID);
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
        email: session.user.email ?? undefined,
        id: session.user.id,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      imageURL: true,
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
    console.log({ error: reqBody.error.formErrors.fieldErrors });
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
        email: session.user.email ?? undefined,
        id: session.user.id,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      imageURL: true,
    },
  });

  if (!note) {
    return Response.json({ error: "Note not found" }, { status: 404 });
  }

  const uploadImage = async (image?: string) => {
    if (!image && !reqBody.data.deleteImg) return undefined;
    if (image && reqBody.data.deleteImg) {
      return Response.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }

    if (!image && reqBody.data.deleteImg) {
      await deleteImage(note.imageURL);
      return "";
    } else if (image) {
      const imageUploadRes = await cloudinary.uploader.upload(image, {
        folder: "notes",
      });

      if (imageUploadRes.error) {
        return Response.json(
          { error: "Failed to upload image" },
          {
            status: 500,
          }
        );
      }

      await deleteImage(note.imageURL);

      const imageURL = imageUploadRes.url;
      return imageURL;
    }
  };

  const imageURL = await uploadImage(reqBody.data.image);

  const updatedNote = await prisma.notes.update({
    where: {
      id: p.noteID,
      creator: {
        email: session.user.email ?? undefined,
        id: session.user.id,
      },
    },
    data: {
      content: reqBody.data.content,
      title: reqBody.data.title,
      imageURL: typeof imageURL === "string" ? imageURL : undefined,
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
  request: NextRequest,
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
        email: session.user.email ?? undefined,
        id: session.user.id,
      },
    },
    include: {
      creator: true,
    },
  });

  if (!note) {
    return Response.json({ error: "Note not found" }, { status: 404 });
  }

  if (
    note.creator.email !== session.user.email &&
    note.creator.id !== session.user.id
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await deleteImage(note.imageURL);

  await prisma.notes.delete({
    where: {
      id: p.noteID,
      creator: {
        email: session.user.email ?? undefined,
        id: session.user.id,
      },
    },
  });

  return Response.json({ status: 204 });
}
