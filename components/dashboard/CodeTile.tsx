import { Language } from "@prisma/client";
import { Clock } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Javascript } from "./languages/Javascript";
import { CPlusPlus } from "./languages/CPlusPlus";
import { CLang } from "./languages/CLang";
import { Python } from "./languages/Python";

interface CodeTileProps {
  id: string;
  title: string;
  updated_at: Date;
  language: Language;
}

export function CodeTile({ title, updated_at, id, language }: CodeTileProps) {
  const bgColor =
    language === Language.cpp
      ? "bg-blue-100 ring-bg-blue-100 shadow-blue-100"
      : language === Language.c
      ? "bg-blue-50 ring-bg-blue-50 shadow-blue-50"
      : language === Language.python
      ? "bg-green-50 ring-bg-green-50 shadow-green-50"
      : "bg-yellow-50 ring-bg-yellow-50 shadow-yellow-50";
  const languageIcon =
    language === Language.cpp ? (
      <CPlusPlus />
    ) : language === Language.c ? (
      <CLang />
    ) : language === Language.python ? (
      <Python />
    ) : (
      <Javascript />
    );

  return (
    <Link
      className={twMerge(
        "backdrop-blur-sm bg-blend-multiply w-full h-16  shadow-md rounded-md overflow-clip bg-cover bg-center hover:scale-110 transition-all hover:shadow-2xl flex items-center justify-between py-2 px-4",
        bgColor
      )}
      href={`/codes/${id}`}
      role="button"
    >
      <div className="flex flex-col">
        <h3 className="text-mantis-900 text-sm font-medium max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </h3>
        <h4 className="text-mantis-900 text-xs font-medium flex items-center gap-1">
          <Clock size={12} />
          {updated_at.toLocaleDateString()}
        </h4>
      </div>
      {languageIcon}
    </Link>
  );
}
