"use client";

import { usePutUserProfileMutation } from "@/store/apiSlice";
import { Language } from "@prisma/client";
import { useEffect, useState } from "react";
import { CodeLanguageSelect } from "../code/CodeLanguageSelect";

interface ProfileCodeLanguageSelectProps {
  language: Language | undefined;
}

export function ProfileCodeLanguageSelect({
  language,
}: ProfileCodeLanguageSelectProps) {
  const [updateUser] = usePutUserProfileMutation();

  const [languageState, setLanguageState] = useState<Language>(
    language ?? "javascript"
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateUser({ defaultLanguage: languageState });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [language, languageState, updateUser]);

  return (
    <div className="gap-1 flex flex-col group max-w-40">
      <label
        htmlFor="defaultCodeLanguage"
        className="px-2 text-xs group-focus-within:text-mantis-500 group-focus-within:font-semibold group-active:text-mantis-500 group-active:font-semibold group-hover:text-mantis-500 group-hover:font-semibold transition-all duration-100 cursor-pointer"
      >
        Default Code Language
      </label>
      <CodeLanguageSelect
        language={languageState}
        setLanguageState={setLanguageState}
      />
    </div>
  );
}
