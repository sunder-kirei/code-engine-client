import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={twMerge(
        "bg-mantis-500 rounded-md p-3 text-mantis-50 text-xl transition-all duration-300 hover:scale-110 hover:bg-mantis-600 active:scale-100",
        className
      )}
      {...props}
    />
  );
}
