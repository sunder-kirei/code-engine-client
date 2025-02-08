import {
  GetAllNotesResponse,
  GetNoteResponse,
  PutNoteRequest,
  PutNoteResponse,
} from "@/types/redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    getAllNotes: builder.query<GetAllNotesResponse, void>({
      query: () => ({
        url: "/notes",
        method: "GET",
      }),
      providesTags: ["Notes"],
    }),
    updateNote: builder.mutation<PutNoteResponse, PutNoteRequest>({
      query: ({ content, noteID, title }) => {
        console.log({ content, noteID, title });

        return {
          url: `/notes/${noteID}`,
          method: "PUT",
          body: { content, title },
        };
      },
      invalidatesTags: (response) => [
        { type: "Notes", id: response?.id },
        { type: "Notes" },
      ],
    }),
    getNote: builder.query<GetNoteResponse, string>({
      query: (noteID) => ({
        url: `/notes/${noteID}`,
        method: "GET",
      }),
      providesTags: (response) => [{ type: "Notes", id: response?.id }],
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
  }),
});

export const {
  useUpdateNoteMutation,
  useGetAllNotesQuery,
  useDeleteNoteMutation,
  useGetNoteQuery,
  endpoints,
} = apiSlice;
