import { z } from "zod";

const emailSchema = z.email({ message: "Invalid email address" });
const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "plaintext",
  "html",
  "css",
  "json",
  "markdown",
] as const;

export const projectSchema = z.object({
    name: z
        .string()
        .min(1, "Project name is required")
        .max(100, "Project name cannot be more than 100 characters"),
})

export const addCollaboratorSchema = z.object({
    email: emailSchema,
})

export const addDocumentSchema = z.object({
    name: z
        .string()
        .min(1, "Document name is required")
        .max(100, "Document name cannot exceed 100 characters"),
    language: z.enum(languages)
})