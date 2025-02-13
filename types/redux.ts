import { CodeFiles, Language, Notes, User } from "@prisma/client";

export type PutNoteRequest = {
  title?: string;
  content?: string;
  noteID: string;
};

export type GetAllNotesRequest = {
  page?: number;
  limit?: number;
};

export type GetAllCodesRequest = {
  page?: number;
  limit?: number;
};

export type PutCodeRequest = {
  title?: string;
  content?: string;
  codeID: string;
  language?: string;
};

export type PutUserProfileRequest = {
  name?: string;
  image?: string;
  darkModeEnabled?: boolean;
  defaultLanguage?: Language;
};

export type PutNoteResponse = Omit<Notes, "creatorId">;
export type GetAllNotesResponse = Omit<Notes, "content" | "creatorId">[];
export type GetNoteResponse = Omit<Notes, "creatorId">;
export type GetUserProfileResponse = Pick<
  User,
  "id" | "name" | "email" | "image" | "UserPreferences"
>;

export type PutCodeResponse = Omit<CodeFiles, "creatorId">;
export type GetAllCodesResponse = Omit<CodeFiles, "content" | "creatorId">[];
export type GetCodeResponse = Omit<CodeFiles, "creatorId">;
