"use client"; // this registers <Editor> as a Client Component

import { useAppSelector } from "@/store";
import { useUpdateNoteMutation } from "@/store/apiSlice";
import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export interface StaticEditorProps {
  initialState: string;
  noteID: string;
}

// Our <Editor> component we can reuse later
export default function StaticEditor({
  initialState,
  noteID,
}: StaticEditorProps) {
  const initialContent = useMemo(() => {
    let parsed = initialState.length > 0 ? JSON.parse(initialState) : undefined;
    if (parsed !== undefined && parsed.length === 0) parsed = undefined;

    return parsed;
  }, [initialState]);
  const isInitialRender = useRef(true);

  const darkModeEnabled = useAppSelector(
    (state) => state.theme.darkModeEnabled
  );
  const [updateNote] = useUpdateNoteMutation();
  const [blockState, setBlockState] = useState<Block[]>(initialContent);

  useEffect(() => {
    if (isInitialRender.current) {
      return;
    }

    const timeout = setTimeout(() => {
      toast.promise(
        updateNote({ content: JSON.stringify(blockState), noteID }),
        {
          loading: "Saving...",
          success: "Saved!",
          error: "Error saving!",
        }
      );
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [blockState, initialContent, noteID, updateNote]);

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    domAttributes: {
      editor: {
        class: "-z-10 grow py-2 ring-1 ring-mantis-500",
      },
    },
    initialContent,
  });

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        toast.promise(
          updateNote({
            content: JSON.stringify(blockState),
            noteID: noteID,
          }),
          {
            loading: "Saving...",
            success: "Saved!",
            error: "Failed to save!",
          }
        );
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [blockState, noteID, updateNote]);

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      theme={darkModeEnabled ? "dark" : "light"}
      onChange={() => {
        isInitialRender.current = false;
        setBlockState(editor.document);
      }}
      className="h-full grow flex flex-col"
    />
  );
}
