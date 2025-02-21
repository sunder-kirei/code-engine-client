"use client";

import { useUpdateNoteMutation } from "@/store/apiSlice";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface NoteTitleInputProps {
  title: string;
  noteID: string;
}

export default function NoteTitleInput({ title, noteID }: NoteTitleInputProps) {
  const isInitialRender = useRef(true);
  const [updateNote] = useUpdateNoteMutation();
  const [titleState, setTitleState] = useState(title);

  useEffect(() => {
    if (isInitialRender.current) {
      return;
    }
    const timeout = setTimeout(() => {
      toast.promise(updateNote({ noteID, title: titleState }), {
        loading: "Saving title...",
        success: "Saved!",
        error: "Error saving!",
      });
      if (titleState) document.title = titleState;
      else document.title = "Untitled";
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [noteID, title, titleState, updateNote]);

  return (
    <input
      className="px-6 py-4 w-full bg-transparent rounded-md overflow-hidden outline-none text-4xl "
      placeholder="Untitled"
      type="text"
      onChange={(e) => {
        isInitialRender.current = false;
        setTitleState(e.target.value);
      }}
      value={titleState}
    />
  );
}
