"use client";

import { useGetAllNotesQuery } from "@/store/apiSlice";
import { NoteTile } from "./NoteTile";

export default function NoteGrid() {
  const { data, isLoading, isError } = useGetAllNotesQuery();
  return (
    <div className="note_grid">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {data?.map((note) => (
        <NoteTile
          key={note.id}
          id={note.id}
          title={note.title}
          updated_at={new Date(note.updatedAt)}
          bgImg={"/assets/test.png"}
        />
      ))}
    </div>
  );
}
