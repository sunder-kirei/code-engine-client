"use client";

import { useAppSelector } from "@/store";

export function HTML({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <html lang="en" className={`${theme}`}>
      {children}
    </html>
  );
}
