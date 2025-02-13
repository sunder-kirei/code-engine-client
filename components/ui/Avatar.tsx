/* eslint-disable @next/next/no-img-element */
import { GetUserProfileResponse } from "@/types/redux";
import { User } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
  data?: GetUserProfileResponse;
  className?: string;
}

export function Avatar({ data, className }: AvatarProps) {
  if (!data || !data?.image)
    return <User className={twMerge("h-full aspect-square", className)} />;

  return (
    <img
      src={data.image.split("=")[0]}
      alt="Avatar"
      className={twMerge(
        "rounded-full h-full aspect-square ring-1 ring-mantis-200",
        className
      )}
    />
  );
}
