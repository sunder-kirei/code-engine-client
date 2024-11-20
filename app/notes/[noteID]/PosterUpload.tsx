"use client";

import { Image, ImagePlus, MapPinPlus, MousePointerClick } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/Button";

export function PosterUpload() {
  const [src, setSrc] = useState<string | undefined>(undefined);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        if (binaryStr === null) return;
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

  return (
    <div
      className="bg-mantis-100 relative w-full h-[30vh] flex cursor-pointer items-center justify-center p-4 bg-cover bg-center"
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
      <Button className="absolute right-4 bottom-4">
        <ImagePlus />
      </Button>
    </div>
  );
}
