import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { GetExecutionStatusResponse } from "@/types/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ codeID: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { codeID } = await params;
  if (!codeID) {
    return Response.json({ error: "Invalid codeID" }, { status: 400 });
  }

  const code = await prisma.codeFiles.findUnique({
    where: {
      id: codeID,
      creator: {
        email: session.user.email,
      },
    },
  });

  if (!code) {
    return Response.json({ error: "Code not found" }, { status: 404 });
  }

  const { pastExecution } = code;

  if (!pastExecution) {
    return Response.json({ error: "No execution history" }, { status: 404 });
  }

  const res = await fetch(
    `${process.env.CODE_ENGINE_API}/execute/${pastExecution}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    return Response.json(
      { error: "Failed to get execution status" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const data: GetExecutionStatusResponse = await res.json();

  return Response.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ codeID: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { codeID } = await params;
  if (!codeID) {
    return Response.json({ error: "Invalid codeID" }, { status: 400 });
  }

  const code = await prisma.codeFiles.findUnique({
    where: {
      id: codeID,
      creator: {
        email: session.user.email,
      },
    },
  });

  if (!code) {
    return Response.json({ error: "Code not found" }, { status: 404 });
  }

  const { content, language } = code;

  const res = await fetch(`${process.env.CODE_ENGINE_API}/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: content,
      language: language,
    }),
  });

  if (!res.ok) {
    return Response.json(
      { error: "Failed to execute code" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const data: GetExecutionStatusResponse = await res.json();

  await prisma.codeFiles.update({
    where: {
      id: codeID,
      creator: {
        email: session.user.email,
      },
    },
    data: {
      pastExecution: [data.id],
    },
  });

  return Response.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
