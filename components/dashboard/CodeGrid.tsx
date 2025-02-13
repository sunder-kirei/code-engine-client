"use client";

import { useGetAllCodesQuery } from "@/store/apiSlice";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "../ui/Skeleton";
import { CodeTile } from "./CodeTile";

interface CodeGridProps {
  page?: number;
  limit?: number;
}

export default function CodeGrid({
  limit = 10,
  page = 1,
  className,
  ...props
}: CodeGridProps & HTMLAttributes<HTMLDivElement>) {
  const { data, isLoading, isError } = useGetAllCodesQuery({ limit, page });

  return (
    <div className={twMerge("note_grid", className)} {...props}>
      {isLoading &&
        Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-md" />
          ))}
      {isError && <div>Error...</div>}
      {data?.map((note) => (
        <CodeTile
          key={note.id}
          id={note.id}
          title={note.title}
          updated_at={new Date(note.updatedAt)}
          language={note.language}
        />
      ))}
      {data?.length === 0 && (
        <div className="aspect-[5/2] rounded-md bg-mantis-300 w-full flex flex-col items-center justify-center gap-2">
          <h2 className="text-mantis-50 text-2xl font-semibold ">
            No CodeFiles
          </h2>
          <Link
            href="/new?type=code"
            className="bg-mantis-500 px-4 py-2 rounded-full text-mantis-100 hover:scale-110 transition-all duration-300"
          >
            Create new code
          </Link>
        </div>
      )}
    </div>
  );
}
