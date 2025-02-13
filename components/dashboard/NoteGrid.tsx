"use client";

import { useGetAllNotesQuery } from "@/store/apiSlice";
import { NoteTile } from "./NoteTile";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "../ui/Skeleton";
import Link from "next/link";

interface NoteGridProps {
  page?: number;
  limit?: number;
}

export default function NoteGrid({
  limit = 10,
  page = 1,
  className,
  ...props
}: NoteGridProps & HTMLAttributes<HTMLDivElement>) {
  const { data, isLoading, isError } = useGetAllNotesQuery({
    limit,
    page,
  });

  return !isLoading && (data?.length ?? 0) === 0 ? (
    <div className="h-48 rounded-md bg-mantis-300 w-full flex flex-col items-center justify-center gap-2">
      <h2 className="text-mantis-50 text-2xl font-semibold ">No Notes</h2>
      <Link
        href="/new?type=note"
        className="bg-mantis-500 px-4 py-2 rounded-full text-mantis-100 hover:scale-110 transition-all duration-300"
      >
        Create new note
      </Link>
    </div>
  ) : (
    <div className={twMerge("note_grid", className)} {...props}>
      {isLoading &&
        Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-md" />
          ))}
      {isError && <div>Error...</div>}
      {data?.map((note) => (
        <NoteTile
          key={note.id}
          id={note.id}
          title={note.title}
          updated_at={new Date(note.updatedAt)}
          bgImg={note.imageURL}
        />
      ))}
    </div>
  );
}
