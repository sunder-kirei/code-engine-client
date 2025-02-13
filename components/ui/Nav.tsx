"use client";

import { Logo } from "@/components/branding/Logo";
import { useAppDispatch, useAppSelector } from "@/store/";
import { usePutUserProfileMutation } from "@/store/apiSlice";
import { themeSlice } from "@/store/themeSlice";
import { GetUserProfileResponse } from "@/types/redux";
import {
  AlignJustify,
  CloudUpload,
  LogOut,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Avatar } from "./Avatar";

interface NavProps {
  userData: GetUserProfileResponse;
}

export function Nav({ userData }: NavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isLoggedIn = userData.id !== undefined && userData.id !== null;
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const darkModeEnabled = useAppSelector(
    (state) => state.theme.darkModeEnabled
  );
  const [darkMode, setDarkMode] = useState(darkModeEnabled);
  const [open, setOpen] = useState(false);
  const isUpdating = useAppSelector((state) => state.util.isUpdating);
  const [updateUser] = usePutUserProfileMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    document.addEventListener("scroll", listener);

    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      updateUser({ darkModeEnabled: darkMode });
    }
    dispatch(themeSlice.actions.setTheme(darkMode));
  }, [userData, updateUser, darkMode, dispatch, isLoggedIn]);

  return (
    <>
      <nav
        className={twMerge(
          "fixed top-0 left-0 h-screen bg-black/50 backdrop-blur-sm z-50 text-white transition-all duration-300 origin-top-right flex flex-col gap-4 items-center justify-center",
          open ? "w-screen pointer-events-auto" : "w-0 pointer-events-none"
        )}
      >
        <li
          className="h-16 grid place-items-center fixed top-3 right-6 aspect-square transition-all duration-300 hover:scale-125 hover:rotate-180"
          role="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <X size={36} />
        </li>
        <Link
          href="/dashboard"
          onClick={() => setOpen((prev) => !prev)}
          className={twMerge(
            "font-bold text-3xl hover:scale-110 transition-all duration-300 after:block after:w-0 after:h-1 after:bg-mantis-900 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/new?type=note"
          onClick={() => setOpen((prev) => !prev)}
          className={twMerge(
            "font-bold text-3xl hover:scale-110 transition-all duration-300 after:block after:w-0 after:h-1 after:bg-mantis-900 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          New Note
        </Link>
        <Link
          href="/new?type=code"
          onClick={() => setOpen((prev) => !prev)}
          className={twMerge(
            "font-bold text-3xl hover:scale-110 transition-all duration-300 after:block after:w-0 after:h-1 after:bg-mantis-900 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          New Code File
        </Link>
        <Link
          href="/profile"
          onClick={() => setOpen((prev) => !prev)}
          className={twMerge(
            "font-bold text-3xl hover:scale-110 transition-all duration-300 after:block after:w-0 after:h-1 after:bg-mantis-900 hover:after:w-full after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          Profile
        </Link>
      </nav>
      <nav className="h-20 w-full sticky z-40 top-0 bg-inherit max-w-screen-2xl mx-auto overflow-hidden">
        <ul className="h-full flex py-4 sm:px-6 px-4 gap-1 overflow-hidden">
          <li className="h-full">
            <Link
              href="/"
              className="flex justify-center items-center h-full gap-2 group"
            >
              <Logo className="p-3 grow-0 shrink-0" />
              <span className="grow font-bold sm:text-xl text-lg group-hover:scale-110 transition-all duration-300 text-nowrap">
                Code Engine
              </span>
            </Link>
          </li>
          <li
            className="h-full aspect-square ml-auto grid place-items-center"
            title="Uploading..."
          >
            <CloudUpload
              className={twMerge(
                "transition-all duration-300 scale-0 opacity-0",
                isUpdating && "scale-100 opacity-100"
              )}
            />
          </li>
          {isLoggedIn && (
            <div
              role="button"
              className="relative h-full grid p-2 place-items-center aspect-square rounded-full group"
            >
              <input
                type="checkbox"
                checked={showProfileDropdown}
                onChange={() => setShowProfileDropdown((prev) => !prev)}
                className="cursor-pointer z-100 peer opacity-0 absolute top-0 right-0 w-full h-full"
                title={userData.name ?? "Profile"}
              />
              <Avatar
                data={userData}
                className="cursor-pointer pointer-events-none text-mantis-500 transition-all duration-300 peer-hover:scale-125 hover:scale-125"
              />
              <ul className="absolute transition-all -translate-y-6 origin-top-right duration-100 top-full right-0 flex flex-col gap-2 ring-1 ring-mantis-300 dark:ring-gray-800 rounded-md bg-white dark:bg-gray-800/90 scale-y-0 group-focus:scale-y-100 group-focus:translate-y-0 peer-checked:scale-y-100 peer-checked:translate-y-0 group-focus:opacity-100 opacity-0 peer-checked:opacity-100">
                <Link
                  href="/profile"
                  onClick={() => setShowProfileDropdown(false)}
                  className="profile-dropdown-item"
                >
                  <User /> Profile
                </Link>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    signOut();
                  }}
                  className="profile-dropdown-item"
                >
                  <LogOut /> LogOut
                </button>
              </ul>
            </div>
          )}
          <li
            className="relative h-6 aspect-square justify-self-center self-center cursor-pointer transition-all duration-300 hover:scale-110"
            onClick={() => {
              setDarkMode((prev) => !prev);
            }}
            role="button"
            title={darkMode ? "Enable light mode" : "Enable dark mode"}
          >
            <Moon
              className={twMerge(
                "absolute top-0 left-0 h-full w-full transition-all",
                darkMode ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              )}
            />
            <Sun
              className={twMerge(
                "absolute top-0 left-0 h-full w-full transition-all",
                !darkMode ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              )}
            />
          </li>
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
