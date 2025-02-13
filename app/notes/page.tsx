import NoteGrid from "@/components/dashboard/NoteGrid";
import { H2 } from "@/components/ui/H2";
import { Page } from "@/components/ui/Page";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number.parseInt((params.page ?? "1") as string, 10);
  const limit = Number.parseInt((params.limit ?? "100") as string, 10);

  if (!params.page || !params.limit) {
    redirect(`/notes?page=${page}&limit=${limit}`);
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/notes/count", {
    headers: await headers(),
  });
  const count = await res.json();

  console.log(count);

  return (
    <Page>
      <H2>All Notes</H2>
      <NoteGrid limit={limit} page={page} />
      <div className="fixed bottom-6 right-6 h-12 flex gap-2">
        <Link
          href={`/notes?page=${page - 1}&limit=${limit}`}
          className={twMerge(
            "h-full block rounded-full p-3 aspect-square bg-mantis-500 text-white",
            page <= 1 && "pointer-events-none bg-gray-500"
          )}
          aria-disabled={page <= 1}
          tabIndex={page <= 1 ? -1 : 0}
        >
          <ChevronLeft className="h-full w-full" />
        </Link>

        <Link
          href={`/notes?page=${page + 1}&limit=${limit}`}
          className={twMerge(
            "h-full block rounded-full p-3 aspect-square bg-mantis-500 text-white",
            count <= page * limit && "pointer-events-none bg-gray-500"
          )}
          aria-disabled={count <= page * limit}
          tabIndex={count <= page * limit ? -1 : 0}
        >
          <ChevronRight className="h-full w-full" />
        </Link>
      </div>
    </Page>
  );
}
