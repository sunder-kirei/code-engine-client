import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { RootState } from ".";

interface UtilState {
  isUpdating: boolean;
}

const initialState: UtilState = {
  isUpdating: false,
};

export const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.updateNote.matchFulfilled,
      (state) => {
        state.isUpdating = false;
      }
    );
    builder.addMatcher(apiSlice.endpoints.updateNote.matchPending, (state) => {
      state.isUpdating = true;
    });
  },
});

export const selectIsUpdating = (state: RootState) => state.util.isUpdating;

export default utilSlice.reducer;
