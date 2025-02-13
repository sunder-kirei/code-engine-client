import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ThemeState {
  darkModeEnabled: boolean;
}

const initialState: ThemeState = {
  darkModeEnabled: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.darkModeEnabled = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.darkModeEnabled;
