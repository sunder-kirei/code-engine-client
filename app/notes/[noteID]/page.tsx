import { Editor } from "@/components/blocknote/DynamicEditor";
import NoteTitleInput from "@/components/notes/NoteTitleInput";
import { Page } from "@/components/ui/Page";
import { GetNoteResponse } from "@/types/redux";
import { headers } from "next/headers";
import { PosterUpload } from "../../../components/notes/PosterUpload";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ noteID: string }>;
}) {
  const { noteID } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteID}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data: GetNoteResponse = await response.json();

  return {
    title: data.title || "Untitled",
  };
}

export default async function Note({
  params,
}: {
  params: Promise<{ noteID: string }>;
}) {
  const { noteID } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteID}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data: GetNoteResponse = await response.json();

  return (
    <>
      <PosterUpload noteID={noteID} userData={data} />
      <Page className="max-w-screen-xl min-h-screen px-3 pb-1 flex flex-col gap-4">
        <NoteTitleInput title={data.title} noteID={noteID} />
        <Editor initialState={data.content} noteID={noteID} />
      </Page>
    </>
  );
}
