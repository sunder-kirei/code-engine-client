import { object, string, optional } from "zod";

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
});
