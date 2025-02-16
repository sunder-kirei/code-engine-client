import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { GetCodeEngineExecutionStatusResponse } from "@/types/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ codeID: string }> }
) {
  try {
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
      select: {
        pastExecution: true,
      },
    });
    if (!code) {
      return Response.json({ error: "Code not found" }, { status: 404 });
    }

    const promises = code.pastExecution.map(({ executionId }) =>
      fetch(`${process.env.CODE_ENGINE_API}/execute/${executionId}`, {
        method: "GET",
        headers: {
          "x-api-key": process.env.X_API_KEY ?? "",
        },
      })
    );

    const responses = await Promise.all(promises);
    const data: GetCodeEngineExecutionStatusResponse[] = await Promise.all(
      responses.map((r) => r.json())
    );

    return Response.json(
      data.sort(
        (a, b) =>
          new Date(b.executeStatus.updatedAt).getTime() -
          new Date(a.executeStatus.updatedAt).getTime()
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.log(e);
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
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ codeID: string }> }
) {
  try {
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
        "x-api-key": process.env.X_API_KEY ?? "",
      },
      body: JSON.stringify({
        code: content,
        language: language,
      }),
    });

    if (!res.ok) {
      console.log(await res.text());
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

    const data: GetCodeEngineExecutionStatusResponse = await res.json();

    await prisma.codeFiles.update({
      where: {
        id: codeID,
      },
      data: {
        pastExecution: {
          push: {
            executionId: data.executeStatus.id,
          },
        },
      },
    });

    return Response.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
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
}
