import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { themeSlice } from "./themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { utilSlice } from "./utilSlice";
import { GetUserProfileResponse } from "@/types/redux";

export function createStore(userData: GetUserProfileResponse) {
  const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      theme: themeSlice.reducer,
      util: utilSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        apiSlice.middleware
      ),

    preloadedState: {
      theme: {
        darkModeEnabled: userData.UserPreferences?.darkModeEnabled ?? false,
      },
    },
  });

  setupListeners(store.dispatch);
  return store;
}

export type RootState = ReturnType<ReturnType<typeof createStore>["getState"]>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
