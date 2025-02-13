"use client"; // Error boundaries must be Client Components

import { H2 } from "@/components/ui/H2";
import { Page } from "@/components/ui/Page";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Page className="grid place-items-center gap-4">
      <H2>Something went wrong!</H2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="bg-mantis-300 hover:bg-mantis-500 text-mantis-50 hover:text-white w-32 max-w-[90%] rounded-md px-4 py-2 transition-all duration-300"
      >
        Try again
      </button>
    </Page>
  );
}
