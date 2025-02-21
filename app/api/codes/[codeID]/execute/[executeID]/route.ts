import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { GetCodeEngineExecutionStatusResponse } from "@/types/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ codeID: string; executeID: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { codeID, executeID } = await params;
    if (!codeID || !executeID) {
      return Response.json(
        { error: "Invalid codeID or executeID" },
        { status: 400 }
      );
    }

    const code = await prisma.codeFiles.findUnique({
      where: {
        id: codeID,
        creator: {
          email: session.user.email ?? undefined,
          id: session.user.id,
        },
      },
    });

    if (!code) {
      return Response.json({ error: "Code not found" }, { status: 404 });
    }

    if (!code.pastExecution.find((e) => e.executionId === executeID)) {
      return Response.json(
        { error: "Execution does not exist" },
        { status: 404 }
      );
    }

    const response = await fetch(
      `${process.env.CODE_ENGINE_API}/execute/${executeID}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.X_API_KEY ?? "",
        },
      }
    );

    const data: GetCodeEngineExecutionStatusResponse = await response.json();

    return Response.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "Failed to get execution status" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
