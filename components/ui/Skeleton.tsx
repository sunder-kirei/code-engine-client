import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "animate-pulse bg-mantis-300 h-full w-full",
        className
      )}
      {...props}
    />
  );
}
