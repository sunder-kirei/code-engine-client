import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: '/notes',
        method: 'GET',
      }),
    }),
    createNote: builder.mutation({
      query: (body) => ({
        url: '/notes',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateNoteMutation, useGetNotesQuery } = apiSlice;
