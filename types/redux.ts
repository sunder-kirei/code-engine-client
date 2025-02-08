import { Notes } from "@prisma/client";

export type PutNoteRequest = {
  title?: string;
  content?: string;
  noteID: string;
};

export type PutNoteResponse = Omit<Notes, "creatorId">;
export type GetAllNotesResponse = Omit<Notes, "content" | "creatorId">[];
export type GetNoteResponse = Omit<Notes, "creatorId">;
