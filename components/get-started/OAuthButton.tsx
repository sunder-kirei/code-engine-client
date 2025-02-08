import { BuiltInProviderType } from "next-auth/providers";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/Button";
import { signIn } from "@/auth";

export function OAuthButton({
  className,
  provider,
  callbackUrl,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: BuiltInProviderType;
  callbackUrl?: string;
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider, {
          redirectTo: callbackUrl,
        });
      }}
    >
      <Button
        className={twMerge(
          "hover:bg-white bg-white ring-1 ring-mantis-300 flex items-center justify-center gap-2 w-full",
          className
        )}
        type="submit"
        {...props}
      />
    </form>
  );
}
