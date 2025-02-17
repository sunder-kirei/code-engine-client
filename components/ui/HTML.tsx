"use client";

import { useAppSelector } from "@/store";

export function HTML({ children }: { children: React.ReactNode }) {
  const darkModeEnabled = useAppSelector(
    (state) => state.theme.darkModeEnabled
  );

  return (
    <html lang="en" className={`${darkModeEnabled ? "dark" : "light"}`}>
      {children}
    </html>
  );
}
