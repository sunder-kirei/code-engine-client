import { Language } from "@prisma/client";
import { boolean, coerce, nativeEnum, object, optional, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const putNoteSchema = object({
  title: optional(string().max(50, "Title must be less than 50 characters")),
  content: optional(
    string().max(10000, "Content must be less than 10000 characters")
  ),
  image: optional(
    string()
      .regex(
        /^data:image\/(png|jpeg|jpg);base64,/,
        "Invalid image format. Only PNG and JPEG are allowed."
      )
      .refine((str) => {
        const sizeInBytes =
          (str.length * 3) / 4 -
          (str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0);
        return sizeInBytes <= 5 * 1024 * 1024; // Max size: 5 MB
      }, "Image size must be less than 5 MB")
  ),
  deleteImg: optional(boolean()),
});

export const putCodeSchema = object({
  title: optional(string().max(50, "Title must be less than 50 characters")),
  content: optional(
    string().max(10000, "Content must be less than 10000 characters")
  ),
  language: optional(nativeEnum(Language, { message: "Invalid language" })),
});

export const putUserProfileSchema = object({
  name: optional(string().max(50, "Name must be less than 50 characters")),
  image: optional(string().url("Invalid image")),
  darkModeEnabled: optional(boolean()),
  defaultLanguage: optional(
    nativeEnum(Language, { message: "Invalid language" })
  ),
});

export const getAllNotesSchema = object({
  page: optional(coerce.number().positive("Page must be a positive number")),
  limit: optional(coerce.number().positive("Limit must be a positive number")),
});

export const getAllCodesSchema = object({
  page: optional(coerce.number().positive("Page must be a positive number")),
  limit: optional(coerce.number().positive("Limit must be a positive number")),
});

export const queryNotesSchema = object({
  title: string().min(1, "Title must be at least 1 character"),
});

export const queryCodesSchema = object({
  title: string().min(1, "Title must be at least 1 character"),
});
