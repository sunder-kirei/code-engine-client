import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { apiSlice } from "./apiSlice";

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
    builder.addMatcher(apiSlice.endpoints.updateNote.matchRejected, (state) => {
      state.isUpdating = false;
    });
    builder.addMatcher(apiSlice.endpoints.updateNote.matchPending, (state) => {
      state.isUpdating = true;
    });

    builder.addMatcher(
      apiSlice.endpoints.updateCode.matchFulfilled,
      (state) => {
        state.isUpdating = false;
      }
    );
    builder.addMatcher(apiSlice.endpoints.updateCode.matchRejected, (state) => {
      state.isUpdating = false;
    });
    builder.addMatcher(apiSlice.endpoints.updateCode.matchPending, (state) => {
      state.isUpdating = true;
    });

    builder.addMatcher(
      apiSlice.endpoints.putUserProfile.matchFulfilled,
      (state) => {
        state.isUpdating = false;
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.putUserProfile.matchRejected,
      (state) => {
        state.isUpdating = false;
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.putUserProfile.matchPending,
      (state) => {
        state.isUpdating = true;
      }
    );
  },
});

export const selectIsUpdating = (state: RootState) => state.util.isUpdating;

export default utilSlice.reducer;
