"use client";

import { Language } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { CodeLanguageSelect } from "./CodeLanguageSelect";

export interface CodeTitleInputProps {
  title: string;
  language: Language;
  setTitleState: Dispatch<SetStateAction<string>>;
  setLanguageState: Dispatch<
    SetStateAction<"javascript" | "python" | "c" | "cpp">
  >;
}

export default function CodeTitleInput({
  title,
  language,
  setTitleState,
  setLanguageState,
}: CodeTitleInputProps) {
  return (
    <div className="h-fit w-full sm:px-6 px-2 mb-4 flex items-center justify-between">
      <input
        className="w-full bg-transparent rounded-md overflow-hidden outline-none text-4xl "
        placeholder="Untitled"
        type="text"
        onChange={(e) => setTitleState(e.target.value)}
        value={title}
      />
      <CodeLanguageSelect
        setLanguageState={setLanguageState}
        language={language}
      />
    </div>
  );
}
