import { BadgeHelp, Code, FilePlus, Search } from "lucide-react";
import { DashboardTile } from "@/components/dashboard/DashboardTile";
import { NoteTile } from "@/components/dashboard/NoteTile";
import { H2 } from "@/components/ui/H2";
import { Page } from "@/components/ui/Page";

export default function Dashboard() {
  return (
    <Page className="flex flex-col gap-8">
      <section>
        <H2>Get Started</H2>
        <div className="flex gap-4">
          <DashboardTile
            icon={FilePlus}
            title="Create a new file"
            label="New File"
          />

          <DashboardTile
            icon={Code}
            title="Start an IDE instance"
            label="IDE"
            className="bg-blue-400 text-mantis-50 group-hover:bg-blue-600 group-hover:text-white"
          />
        </div>
      </section>
      <section>
        <H2 className="flex items-center gap-2 justify-between text-nowrap">
          Your Notes
          <div className="w-fit h-12 flex group items-center gap-2 justify-center">
            <label htmlFor="search">
              <Search className="text-mantis-500" size={24} />
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="w-0 max-w-full opacity-0 sm:opacity-100 sm:w-48 sm:px-2 transition-all  group-focus-within:w-48 rounded ring-1 ring-mantis-500 group-focus-within:px-2 group-focus-within:opacity-100 text-base font-normal outline-mantis-600 bg-transparent"
            />
          </div>
        </H2>
        <div className="note_grid">
          <NoteTile
            title="Untitled"
            updated_at={new Date()}
            bgImg="/assets/test.png"
          />
          <NoteTile title="Untitled" updated_at={new Date()} />
          <NoteTile title="Untitled" updated_at={new Date()} />
          <NoteTile
            title="Untitled"
            updated_at={new Date()}
            bgImg="/assets/test.png"
          />
          <NoteTile
            title="Untitled"
            updated_at={new Date()}
            bgImg="/assets/test.png"
          />
        </div>
      </section>
      <BadgeHelp
        className="bg-mantis-500 text-white text-sm p-4 rounded-full fixed bottom-6 right-6 hover:bg-mantis-600 transition-all  hover:scale-110"
        size={64}
        role="button"
      />
    </Page>
  );
}
