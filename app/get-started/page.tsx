import { Github } from "lucide-react";
import { signIn } from "@/auth";
import { GoogleIcon } from "@/components/get-started/GoogleIcon";
import { OAuthButton } from "@/components/get-started/OAuthButton";
import { Button } from "@/components/ui/Button";
import { Page } from "@/components/ui/Page";
import { TextInput } from "@/components/ui/TextInput";

export default function GetStarted() {
  return (
    <Page className="flex flex-col items-center justify-start gap-8">
      <h2 className="text-2xl">Let&apos;s get you set up.</h2>
      <div className="w-96 bg-mantis-100 p-6 rounded-lg flex flex-col gap-4">
        <OAuthButton provider="google">
          <GoogleIcon className="text-2xl" />
          <span className="text-base text-mantis-900">
            Continue with Google
          </span>
        </OAuthButton>
        <OAuthButton provider="github">
          <Github className="text-2xl text-black" />
          <span className="text-base text-mantis-900">
            Continue with GitHub
          </span>
        </OAuthButton>
        <div className="flex items-center gap-4">
          <div className="h-[1px] bg-mantis-400 dark:bg-mantis-400/70   mx-auto w-full my-4" />
          <span>or</span>
          <div className="h-[1px] bg-mantis-400 dark:bg-mantis-400/70   mx-auto w-full my-4" />
        </div>
        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData);
          }}
          className="flex flex-col gap-4"
        >
          <TextInput placeholder="Email" type="email" name="email" />
          <Button className="w-full text-base font-bold">
            Continue with Email
          </Button>
        </form>
      </div>
    </Page>
  );
}
