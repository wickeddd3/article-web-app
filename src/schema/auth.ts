import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
