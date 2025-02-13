"use client";

import { Provider } from "react-redux";
import { createStore } from "@/store";
import { GetUserProfileResponse } from "@/types/redux";

export function ReduxProvider({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: GetUserProfileResponse;
}) {
  const store = createStore(userData);
  return <Provider store={store}>{children}</Provider>;
}
