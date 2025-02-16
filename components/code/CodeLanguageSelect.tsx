import { Language } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CLang } from "../dashboard/languages/CLang";
import { CPlusPlus } from "../dashboard/languages/CPlusPlus";
import { Javascript } from "../dashboard/languages/Javascript";
import { Python } from "../dashboard/languages/Python";

interface CodeLanguageSelectProps {
  setLanguageState: Dispatch<SetStateAction<Language>>;
  language: Language;
}

export function CodeLanguageSelect({
  setLanguageState,
  language,
}: CodeLanguageSelectProps) {
  const [showDialog, setShowDialog] = useState(false);

  const selectLanguage = {
    [Language.CPP]: (
      <div
        onClick={() => setLanguageState(Language.CPP)}
        className="language-select-icon"
        role="button"
        key={Language.CPP}
      >
        .cpp
        <CPlusPlus />
      </div>
    ),
    [Language.C]: (
      <div
        onClick={() => setLanguageState(Language.C)}
        className="language-select-icon"
        role="button"
        key={Language.C}
      >
        .c
        <CLang />
      </div>
    ),
    [Language.PYTHON]: (
      <div
        onClick={() => setLanguageState(Language.PYTHON)}
        className="language-select-icon"
        role="button"
        key={Language.PYTHON}
      >
        .py
        <Python />
      </div>
    ),
    [Language.JAVASCRIPT]: (
      <div
        onClick={() => setLanguageState(Language.JAVASCRIPT)}
        className="language-select-icon"
        role="button"
        key={Language.JAVASCRIPT}
      >
        .js
        <Javascript />
      </div>
    ),
  };
  return (
    <div
      className="ring-1 ring-mantis-300 h-full rounded-full relative"
      role="button"
      onClick={() => setShowDialog(!showDialog)}
    >
      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
        {selectLanguage[language]}
      </div>

      <div
        className={twMerge(
          "absolute top-0 opacity-0 overflow-hidden translate-y-4 right-0 h-fit scale-y-0 origin-top transition-all duration-300 w-fit flex flex-col gap-2 items-center justify-center z-40 p-2",
          showDialog && "scale-y-100 opacity-100 top-full"
        )}
      >
        {Object.values(selectLanguage).map((value) => value)}
      </div>
    </div>
  );
}
