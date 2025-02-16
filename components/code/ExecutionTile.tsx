"use client";

import { GetExecutionStatusResponse } from "@/types/redux";
import { twMerge } from "tailwind-merge";

interface ExecutionTileProps {
  data: GetExecutionStatusResponse;
}

export function ExecutionTile({ data }: ExecutionTileProps) {
  return (
    <div
      className={twMerge(
        "w-full h-12 flex items-center justify-between transition-all duration-200 cursor-pointer border-b border-mantis-900 hover:bg-mantis-300",
        data.executeStatus.status === "SUCCESS" && "text-green-500",
        data.executeStatus.status === "COMPILATION_ERROR" && "text-red-500",
        data.executeStatus.status === "RUNTIME_ERROR" && "text-red-500",
        data.executeStatus.status === "PENDING" && "text-yellow-500",
        data.executeStatus.status === "COMPILING" && "text-yellow-500",
        data.executeStatus.status === "COMPILED" && "text-yellow-500"
      )}
    >
      <span className="flex items-center h-full grow-0 shrink-0">
        {new Date(data.executeStatus.createdAt).toLocaleDateString()}
      </span>{" "}
      |
      <span className="flex items-center h-full grow-0 shrink-0">
        {data.executeStatus.code.language}
      </span>
      |
      <span className="flex items-center h-full grow-0 shrink-0 text-ellipsis overflow-hidden">
        {data.executeStatus.status}
      </span>
    </div>
  );
}
