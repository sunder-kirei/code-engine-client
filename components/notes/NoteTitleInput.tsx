"use client";

import { useUpdateNoteMutation } from "@/store/apiSlice";
import { useEffect, useState } from "react";

export interface NoteTitleInputProps {
  title: string;
  noteID: string;
}

export default function NoteTitleInput({ title, noteID }: NoteTitleInputProps) {
  const [updateNote] = useUpdateNoteMutation();
  const [titleState, setTitleState] = useState(title);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateNote({ noteID, title: titleState });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [noteID, titleState, updateNote]);

  return (
    <input
      className="px-6 py-4 w-full bg-transparent rounded-md overflow-hidden outline-none text-4xl "
      placeholder="Untitled"
      type="text"
      onChange={(e) => setTitleState(e.target.value)}
      value={titleState}
    />
  );
}
