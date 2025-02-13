import { GetCodeResponse } from "@/types/redux";
import { headers } from "next/headers";
import { ClientCodePage } from "./ClientCodePage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ codeID: string }>;
}) {
  const { codeID } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/codes/${codeID}`,
    {
      headers: await headers(),
    }
  );
  const data: GetCodeResponse = await response.json();

  return {
    title: data.title || "Untitled",
  };
}

export default async function CodePage({
  params,
}: {
  params: Promise<{ codeID: string }>;
}) {
  const { codeID } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/codes/${codeID}`,
    {
      headers: await headers(),
    }
  );
  const data: GetCodeResponse = await response.json();

  return <ClientCodePage codeID={codeID} initData={data} />;
}
