"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AlignJustify, Moon, Sun, X } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { useAppDispatch, useAppSelector } from "@/store/";
import { setTheme } from "@/store/themeSlice";

export function Nav() {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  });

  return (
    <>
      <nav
        className={twMerge(
          "fixed top-0 left-0 h-screen bg-black/50 backdrop-blur-sm z-50 transition-all duration-300 origin-top-right",
          open ? "w-screen pointer-events-auto" : "w-0 pointer-events-none"
        )}
      >
        <li
          className="h-16  grid place-items-center fixed top-3 right-6 aspect-square transition-all duration-300 hover:scale-125 hover:rotate-180"
          role="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <X size={36} />
        </li>
      </nav>
      <nav className="h-20 w-full sticky top-0 bg-inherit max-w-screen-2xl mx-auto">
        <ul className="h-full flex py-4 px-6">
          <li className="h-full">
            <Link
              href="/"
              className="flex justify-center items-center h-full gap-2 group"
            >
              <Logo className="p-3 grow-0 shrink-0" />
              <span className="grow font-bold text-xl group-hover:scale-110 transition-all duration-300">
                Code Engine
              </span>
            </Link>
          </li>
          <div
            className="relative h-6 aspect-square ml-auto justify-self-center self-center cursor-pointer transition-all duration-300 hover:scale-110"
            onClick={() => {
              dispatch(setTheme(theme.theme === "light" ? "dark" : "light"));
            }}
          >
            <Moon
              className={twMerge(
                "absolute top-0 left-0 h-full w-full transition-all duration-300",
                theme.theme === "dark"
                  ? "opacity-100 rotate-0"
                  : "opacity-0 -rotate-90"
              )}
            />
            <Sun
              className={twMerge(
                "absolute top-0 left-0 h-full w-full transition-all duration-300",
                theme.theme === "light"
                  ? "opacity-100 rotate-0"
                  : "opacity-0 -rotate-90"
              )}
            />
          </div>
          <li
            className="h-full grid place-items-center aspect-square transition-all duration-300 hover:scale-125"
            role="button"
            onClick={() => setOpen((prev) => !prev)}
          >
            <AlignJustify />
          </li>
        </ul>
        <div
          className={twMerge(
            "h-[1px] bg-mantis-900 dark:bg-mantis-400/70 transition-all duration-300 mx-auto",
            isVisible ? "w-[90%]" : "w-0"
          )}
        />
      </nav>
    </>
  );
}
