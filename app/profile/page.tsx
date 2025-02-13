import { ProfileCodeLanguageSelect } from "@/components/profile/ProfileCodeLanguageSelect";
import { ProfileInput } from "@/components/profile/ProfileInput";
import { Avatar } from "@/components/ui/Avatar";
import { H2 } from "@/components/ui/H2";
import { Page } from "@/components/ui/Page";
import { GetUserProfileResponse } from "@/types/redux";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface ProfileSearchParams {
  tab?: "info" | "preference";
}

export default async function Profile({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params: ProfileSearchParams = await searchParams;
  if (!params || !params.tab) {
    redirect("/profile?tab=info");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: new Headers(await headers()),
  });
  const data: GetUserProfileResponse = await response.json();

  return (
    <Page className="flex flex-col">
      <H2>Profile</H2>
      <section className="flex sm:flex-row items-center sm:items-start flex-col gap-4 grow">
        <ul className="flex sm:flex-col flex-row gap-4 w-fit">
          <Link
            href="/profile?tab=info"
            className={twMerge(
              "profile-nav-link",
              params.tab === "info" && "profile-nav-link__selected"
            )}
          >
            Basic Information
          </Link>
          <Link
            href="/profile?tab=preference"
            className={twMerge(
              "profile-nav-link",
              params.tab === "preference" && "profile-nav-link__selected"
            )}
          >
            Preferences
          </Link>
        </ul>
        <div className="justify-self-stretch border-r-2 dark:border-gray-100/10" />
        {params.tab === "info" && (
          <ul className="w-full h-full flex flex-col items-center sm:items-start gap-6">
            <div className="h-48 aspect-square self-center">
              <Avatar data={data} />
            </div>
            <ProfileInput
              label="Username"
              type="text"
              field="name"
              defaultValue={data.name ?? ""}
            />

            <ProfileInput
              label="Email"
              type="email"
              field="email"
              disabled={true}
              aria-disabled={true}
              defaultValue={data.email ?? ""}
            />
          </ul>
        )}
        {params.tab === "preference" && (
          <ul className="w-full h-full flex flex-col items-center sm:items-start gap-6">
            <ProfileCodeLanguageSelect
              language={data.UserPreferences?.defaultLanguage}
            />
          </ul>
        )}
      </section>
    </Page>
  );
}
