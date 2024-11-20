import { Editor } from "@/components/blocknote/DynamicEditor";
import { Page } from "@/components/ui/Page";
import { PosterUpload } from "./PosterUpload";

export default function Note({ params }: { params: { noteID: string } }) {
  return (
    <>
      <PosterUpload />
      <Page className="max-w-screen-xl px-3 pb-1 flex flex-col gap-4">
        <input
          className="px-6 py-4 w-full bg-transparent rounded-md overflow-hidden outline-none text-4xl "
          placeholder="Untitled"
          type="text"
        />
        <Editor />
      </Page>
    </>
  );
}
