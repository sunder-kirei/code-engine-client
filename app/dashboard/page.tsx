import CodeGrid from "@/components/dashboard/CodeGrid";
import { DashboardLink } from "@/components/dashboard/DashboardLink";
import NoteGrid from "@/components/dashboard/NoteGrid";
import { H2 } from "@/components/ui/H2";
import { Page } from "@/components/ui/Page";
import { GetUserProfileResponse } from "@/types/redux";
import { ChevronRight, Code, FilePlus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export async function generateMetadata() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: new Headers(await headers()),
  });
  const data: GetUserProfileResponse = await response.json();
  return {
    title: `${data.name ?? "Guest"}'s Dashboard`,
    description: "Dashboard",
  };
}

export default async function Dashboard() {
  return (
    <Page className="flex flex-col gap-8">
      <section>
        <H2>Get Started</H2>
        <div className="flex gap-4">
          <DashboardLink
            icon={FilePlus}
            title="Create a new file"
            label="New File"
            type="note"
          />

          <DashboardLink
            icon={Code}
            title="Start an IDE instance"
            label="IDE"
            type="code"
            className="bg-blue-400 text-mantis-50 group-hover:bg-blue-600 group-hover:text-white"
          />
        </div>
      </section>
      <section>
        <H2 className="flex items-center gap-2 justify-between text-nowrap">
          <Link
            href="/notes"
            className="flex gap-1 justify-center items-center hover:text-mantis-500 group transition-all duration-200"
          >
            Your Notes
            <ChevronRight />
            <ChevronRight className="chevron-notes -translate-x-full group-hover:-translate-x-4 transition-transform duration-200" />
          </Link>
          {/* <div className="w-fit h-12 flex group items-center gap-2 justify-center">
            <label htmlFor="search">
              <Search className="text-mantis-500" size={24} />
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="w-0 max-w-full opacity-0 sm:opacity-100 sm:w-48 sm:px-2 transition-all  group-focus-within:w-48 rounded ring-1 ring-mantis-500 group-focus-within:px-2 group-focus-within:opacity-100 text-base font-normal outline-mantis-600 bg-transparent"
            />
          </div> */}
        </H2>
        <NoteGrid />
      </section>
      <section>
        <H2 className="flex items-center gap-2 justify-between text-nowrap">
          <Link
            href="/codes"
            className="flex gap-1 justify-center items-center hover:text-mantis-500 group transition-all duration-200"
          >
            Your CodeFiles
            <ChevronRight />
            <ChevronRight className="chevron-notes -translate-x-full group-hover:-translate-x-4 transition-transform duration-200" />
          </Link>
          {/* <div className="w-fit h-12 flex group items-center gap-2 justify-center">
            <label htmlFor="search">
              <Search className="text-mantis-500" size={24} />
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="w-0 max-w-full opacity-0 sm:opacity-100 sm:w-48 sm:px-2 transition-all  group-focus-within:w-48 rounded ring-1 ring-mantis-500 group-focus-within:px-2 group-focus-within:opacity-100 text-base font-normal outline-mantis-600 bg-transparent"
            />
          </div> */}
        </H2>
        <CodeGrid />
      </section>
      {/* <BadgeHelp
        className="bg-mantis-500 text-white text-sm p-4 rounded-full fixed bottom-6 right-6 hover:bg-mantis-600 transition-all  hover:scale-110"
        size={64}
        role="button"
      /> */}
    </Page>
  );
}
