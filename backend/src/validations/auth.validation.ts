import { z } from "zod";

const emailSchema = z.email({ message: "Invalid email address" })

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must be at most 50 characters long" }),
    email: emailSchema,
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" })
})

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, { message: "Password is required" })
})