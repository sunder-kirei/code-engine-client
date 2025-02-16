import {
  GetAllCodesRequest,
  GetAllCodesResponse,
  GetAllNotesRequest,
  GetAllNotesResponse,
  GetCodeResponse,
  GetExecutionStatusResponse,
  GetNoteResponse,
  GetUserProfileResponse,
  PutCodeRequest,
  PutCodeResponse,
  PutNoteRequest,
  PutNoteResponse,
  PutUserProfileRequest,
} from "@/types/redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Notes", "Codes", "UserProfile", "ExecutionResults"],
  endpoints: (builder) => ({
    getUserProfile: builder.query<GetUserProfileResponse, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),
    putUserProfile: builder.mutation<
      GetUserProfileResponse,
      PutUserProfileRequest
    >({
      query: ({ name, image, defaultLanguage, darkModeEnabled }) => ({
        url: "/user",
        method: "PATCH",
        body: {
          name,
          image,
          defaultLanguage,
          darkModeEnabled,
        },
      }),
      invalidatesTags: ["UserProfile"],
    }),

    getAllNotes: builder.query<GetAllNotesResponse, GetAllNotesRequest>({
      query: ({ limit, page }) => ({
        url: `/notes?limit=${limit}&page=${page}`,
        method: "GET",
      }),
      providesTags: (response) =>
        (response ?? []).map((note) => ({ type: "Notes", id: note.id })),
    }),
    getNote: builder.query<GetNoteResponse, string>({
      query: (noteID) => ({
        url: `/notes/${noteID}`,
        method: "GET",
      }),
      providesTags: (response) => [{ type: "Notes", id: response?.id }],
    }),
    queryNote: builder.query<GetNoteResponse, string>({
      query: (query) => ({
        url: `/notes/query?title=${query}`,
        method: "GET",
      }),
    }),
    updateNote: builder.mutation<PutNoteResponse, PutNoteRequest>({
      query: ({ content, noteID, title, image, deleteImg }) => {
        return {
          url: `/notes/${noteID}`,
          method: "PATCH",
          body: { content, title, image, deleteImg },
        };
      },
      invalidatesTags: (response) => [
        { type: "Notes", id: response?.id },
        { type: "Notes" },
      ],
    }),
    deleteNote: builder.mutation<void, string>({
      query: (noteID) => ({
        url: `/notes/${noteID}`,
        method: "DELETE",
      }),
      invalidatesTags: (response, error, noteID) => [
        { type: "Notes", id: noteID },
        { type: "Notes" },
      ],
    }),

    getAllCodes: builder.query<GetAllCodesResponse, GetAllCodesRequest>({
      query: ({ limit = 10, page = 1 }) => ({
        url: `/codes?limit=${limit}&page=${page}`,
        method: "GET",
      }),
      providesTags: (response) =>
        (response ?? []).map((code) => ({ type: "Codes", id: code.id })),
    }),
    getCode: builder.query<GetCodeResponse, string>({
      query: (codeID) => ({
        url: `/codes/${codeID}`,
        method: "GET",
      }),
      providesTags: (response) => [{ type: "Codes", id: response?.id }],
    }),
    queryCode: builder.query<GetCodeResponse, string>({
      query: (query) => ({
        url: `/codes/query?title=${query}`,
        method: "GET",
      }),
      providesTags: (response) => [{ type: "Codes", id: response?.id }],
    }),
    updateCode: builder.mutation<PutCodeResponse, PutCodeRequest>({
      query: ({ content, codeID, title, language }) => {
        return {
          url: `/codes/${codeID}`,
          method: "PATCH",
          body: { content, title, language },
        };
      },
      invalidatesTags: (response) => [{ type: "Codes", id: response?.id }],
    }),
    deleteCode: builder.mutation<void, string>({
      query: (codeID) => ({
        url: `/codes/${codeID}`,
        method: "DELETE",
      }),
      invalidatesTags: (response, error, codeID) => [
        { type: "Codes", id: codeID },
      ],
    }),

    executeCode: builder.mutation<GetExecutionStatusResponse, string>({
      query: (codeID) => ({
        url: `/codes/${codeID}/execute`,
        method: "POST",
      }),
      invalidatesTags: ["ExecutionResults"],
    }),
    getExecutionStatus: builder.query<
      GetExecutionStatusResponse,
      { codeID: string; executeID: string }
    >({
      query: ({ codeID, executeID }) => ({
        url: `/codes/${codeID}/execute/${executeID}`,
        method: "GET",
      }),
      providesTags: (response) => [
        { type: "ExecutionResults", id: response?.executeStatus.id },
      ],
    }),
    getAllExecutions: builder.query<GetExecutionStatusResponse[], string>({
      query: (codeID) => ({
        url: `/codes/${codeID}/execute`,
        method: "GET",
      }),
      providesTags: ["ExecutionResults"],
    }),
  }),
});

export const {
  useUpdateNoteMutation,
  useGetAllNotesQuery,
  useDeleteNoteMutation,
  useGetNoteQuery,
  useUpdateCodeMutation,
  useGetAllCodesQuery,
  useDeleteCodeMutation,
  useGetCodeQuery,
  useGetUserProfileQuery,
  useQueryCodeQuery,
  useQueryNoteQuery,
  usePutUserProfileMutation,
  useExecuteCodeMutation,
  useGetExecutionStatusQuery,
  useGetAllExecutionsQuery,
  endpoints,
} = apiSlice;
