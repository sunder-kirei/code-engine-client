import { Logo } from "@/components/branding/Logo";

export default function Loading() {
  return (
    <div className="w-screen h-screen grid place-items-center bg-black/50 fixed top-0 z-[100]">
      <Logo className="size-20 animate-bounce" />
    </div>
  );
}
