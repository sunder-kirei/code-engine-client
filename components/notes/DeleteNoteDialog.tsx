"use client";

import { useDeleteNoteMutation } from "@/store/apiSlice";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DeleteNoteDialogProps {
  noteID: string;
}

export function DeleteNoteDialog({ noteID }: DeleteNoteDialogProps) {
  const [show, setShow] = useState(false);
  const [deleteNote] = useDeleteNoteMutation();

  const onCancel = () => {
    setShow(false);
  };

  const onConfirm = () => {
    deleteNote(noteID);
    setShow(false);
    redirect("/dashboard");
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    });
  }, []);

  return (
    <>
      <div
        className={twMerge(
          "fixed top-0 left-0 h-screen w-screen bg-black/50 transition-all duration-300 backdrop-blur-sm z-50 flex flex-col items-center justify-center",
          show
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-0 pointer-events-none"
        )}
      >
        <div className="bg-mantis-100 dark:bg-gray-800 rounded-md p-6 flex flex-col gap-6 shadow-lg">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl text-mantis-900 font-bold">Delete Note</h1>
            <p className="text-base text-mantis-500">
              Are you sure you want to delete this note?
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition-all duration-300"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-mantis-500 hover:bg-mantis-600 text-white text-sm px-4 py-2 rounded-md transition-all duration-300"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      <Trash2
        className="bg-red-500 hover:bg-red-600 text-white text-sm p-4 rounded-full fixed bottom-6 right-6 transition-all  hover:scale-110"
        size={64}
        role="button"
        onClick={() => setShow(true)}
      />
    </>
  );
}
