/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import { NotionIcon } from "@/components/landing/NotionIcon";
import { VsCodeIcon } from "@/components/landing/VsCodeIcon";
import { LinkButton } from "@/components/ui/LinkButton";
import { Page } from "@/components/ui/Page";
import { Github, X } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Index() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <Page className="flex flex-col md:flex-row justify-center items-center gap-8">
      <div className="w-full bg-mantis-50 rounded-lg">
        <img
          src="/assets/PNG/Fast-Internet.png"
          alt="Fast Internet"
          className="w-full max-h-[600px] object-contain"
        />
      </div>
      <div className="w-full text-2xl font-bold text-center flex flex-col gap-6 justify-center items-center">
        <h1 className=" dark:text-mantis-400 text-6xl">
          Welcome to{" "}
          <span className="text-nowrap text-mantis-500">Code Engine</span>
        </h1>
        <h2>Take Notes. Execute in place.</h2>
        <h2 className="flex justify-center items-center gap-2 font-bold text-6xl text-mantis-500">
          <NotionIcon />
          <X className="font-bold" />
          <VsCodeIcon />
        </h2>
        <div className="flex flex-row gap-4 justify-center items-center">
          <LinkButton href="get-started">Get Started</LinkButton>
          <LinkButton href="https://github.com/sunder-kirei/code-engine-client">
            <Github />
          </LinkButton>
        </div>
      </div>
    </Page>
  );
}
