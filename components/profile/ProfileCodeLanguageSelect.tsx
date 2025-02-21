"use client";

import { usePutUserProfileMutation } from "@/store/apiSlice";
import { Language } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { CodeLanguageSelect } from "../code/CodeLanguageSelect";
import { toast } from "sonner";

interface ProfileCodeLanguageSelectProps {
  language: Language | undefined;
}

export function ProfileCodeLanguageSelect({
  language,
}: ProfileCodeLanguageSelectProps) {
  const isInitialRender = useRef(true);
  const [updateUser] = usePutUserProfileMutation();

  const [languageState, setLanguageState] = useState<Language>(
    language ?? Language.JAVASCRIPT
  );

  useEffect(() => {
    if (isInitialRender.current) {
      return;
    }

    const timeout = setTimeout(() => {
      toast.promise(updateUser({ defaultLanguage: languageState }), {
        loading: "Updating language...",
        success: "Updated language!",
        error: "Failed to update language!",
      });
    }, 300);

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
        setLanguageState={(value) => {
          isInitialRender.current = false;
          setLanguageState(value);
        }}
      />
    </div>
  );
}
