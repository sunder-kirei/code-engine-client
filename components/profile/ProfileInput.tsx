"use client";

import { usePutUserProfileMutation } from "@/store/apiSlice";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ProfileInputProps {
  label: string;
  defaultValue?: string;
  field: "name" | "email";
}

export function ProfileInput({
  label,
  placeholder,
  type,
  className,
  defaultValue,
  field,
  ...props
}: ProfileInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const [updateUser] = usePutUserProfileMutation();

  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateUser({ [field]: state });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [defaultValue, field, state, updateUser]);

  return (
    <div className="gap-1 flex flex-col group">
      <label
        htmlFor={label}
        className="px-2 text-xs group-focus-within:text-mantis-500 group-focus-within:font-semibold group-active:text-mantis-500 group-active:font-semibold group-hover:text-mantis-500 group-hover:font-semibold transition-all duration-100 cursor-pointer"
      >
        {label}
      </label>
      <input
        id={label}
        className={twMerge(
          "px-2 w-full bg-transparent rounded-md overflow-hidden outline-none text-lg",
          className
        )}
        placeholder={placeholder ?? "Untitled"}
        type={type ?? "text"}
        value={state}
        onChange={(event) => setState(event.target.value)}
        {...props}
      />
    </div>
  );
}
