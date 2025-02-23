/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Button } from "@/components/ui/Button";
import { useUpdateNoteMutation } from "@/store/apiSlice";
import { GetNoteResponse } from "@/types/redux";
import { Image, MapPinPlus, MousePointerClick, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export interface PosterUploadProps {
  noteID: string;
  userData: GetNoteResponse;
}

export function PosterUpload({ noteID, userData }: PosterUploadProps) {
  const isInitialRender = useRef(true);
  const [src, setSrc] = useState<string | undefined>(
    userData.imageURL ?? undefined
  );
  const [updateNote] = useUpdateNoteMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        toast.error("File reading was aborted");
        console.log("file reading was aborted");
      };
      reader.onerror = () => {
        toast.error("File reading has failed");
        console.log("file reading has failed");
      };
      reader.onload = () => {
        // Do whatever you want with the file contents
        if (reader.result === null) return;
        const binaryStr = reader.result as string;

        const sizeInBytes =
          (binaryStr.length * 3) / 4 -
          (binaryStr.endsWith("==") ? 2 : binaryStr.endsWith("=") ? 1 : 0);
        if (sizeInBytes > 5 * 1024 * 1024) {
          toast.error("Image size must be less than 5 MB");
          return;
        }
        isInitialRender.current = false;
        setSrc(binaryStr as string);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    if (isInitialRender.current) {
      return;
    }

    if (src && src.length > 0) {
      toast.promise(updateNote({ image: src, noteID: noteID }), {
        loading: "Uploading...",
        success: "Poster uploaded successfully",
        error: "Failed to upload poster",
      });
    }
    if (src?.length === 0) {
      toast.promise(updateNote({ deleteImg: true, noteID: noteID }), {
        loading: "Deleting...",
        success: "Poster deleted successfully",
        error: "Failed to delete poster",
      });
    }
  }, [noteID, src, updateNote]);

  return (
    <div className="wrapper relative">
      <div
        className="bg-mantis-100 w-full h-[30vh] flex cursor-pointer items-center justify-center p-4 bg-cover bg-center"
        style={{
          backgroundImage: src && `url(${src})`,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive && (
          <em className="text-mantis-500 flex items-center gap-2 transition-all duration-300">
            Drop &apos;em here... <MapPinPlus />
          </em>
        )}
        {!isDragActive && !src && (
          <em className="text-mantis-500 text-sm flex items-center gap-2 transition-all duration-300">
            <span className="text-nowrap">Drag and drop</span> <Image />{" "}
            <span className="text-nowrap">here, or </span>
            <MousePointerClick />{" "}
            <span className="text-nowrap">to select a file to upload.</span>
          </em>
        )}
      </div>
      <div className="actions flex gap-2 items-center justify-center w-fit absolute right-4 bottom-4">
        <Button
          className={twMerge(
            "bg-red-500 hover:bg-red-600  transition-all duration-300 text-white",
            src === undefined || src.length === 0
              ? "opacity-0 scale-0"
              : "opacity-100 scale-100"
          )}
          onClick={() => setSrc("")}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
