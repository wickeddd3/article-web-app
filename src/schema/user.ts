import { z } from "zod";

export const UserSchema = z.object({
  firstname: z
    .string({ required_error: "First Name is required" })
    .trim()
    .min(1, { message: "First Name is required" }),
  lastname: z
    .string({ required_error: "Last Name is required" })
    .trim()
    .min(1, { message: "Last Name is required" }),
  type: z.enum(["Writer", "Editor"]),
  status: z.enum(["Active", "Inactive"]),
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

export type UserSchemaType = z.infer<typeof UserSchema>;

export const EditUserSchema = z.object({
  id: z.number(),
  firstname: z
    .string({ required_error: "First Name is required" })
    .trim()
    .min(1, { message: "First Name is required" }),
  lastname: z
    .string({ required_error: "Last Name is required" })
    .trim()
    .min(1, { message: "Last Name is required" }),
  type: z.enum(["Writer", "Editor"]),
  status: z.enum(["Active", "Inactive"]),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .optional()
    .refine(
      (value) => value === undefined || value === "" || value.length >= 6,
      {
        message: "Password must be at least 6 characters if provided.",
      }
    ),
});

export type EditUserSchemaType = z.infer<typeof EditUserSchema>;
