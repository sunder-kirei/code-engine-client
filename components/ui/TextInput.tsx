import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={twMerge(
        "px-6 py-3 bg-white ring-1 ring-mantis-300 flex items-center justify-center gap-2 w-full rounded-md outline-mantis-400 ",
        className
      )}
      {...props}
    />
  );
}
