import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const ArticleSchema = z.object({
  companyId: z
    .number({ required_error: "Company is required" })
    .min(1, { message: "Company is required" }),
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, { message: "Title is required" }),
  link: z
    .string({ required_error: "Link is required" })
    .trim()
    .min(1, { message: "Link is required" })
    .url(),
  date: z
    .string()
    .nonempty("Date is required")
    .refine((value) => !isNaN(Date.parse(value)), "Invalid date format"),
  content: z
    .string({ required_error: "Content is required" })
    .trim()
    .min(1, { message: "Content is required" }),
  status: z.enum(["ForEdit", "Published"]),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Image is required and must be a valid file",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be under 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, and .png files are accepted."
    ),
});

export type ArticleSchemaType = z.infer<typeof ArticleSchema>;

export const EditArticleSchema = z.object({
  id: z.number(),
  companyId: z
    .number({ required_error: "Company is required" })
    .min(1, { message: "Company is required" }),
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, { message: "Title is required" }),
  link: z
    .string({ required_error: "Link is required" })
    .trim()
    .min(1, { message: "Link is required" })
    .url(),
  date: z
    .string()
    .nonempty("Date is required")
    .refine((value) => !isNaN(Date.parse(value)), "Invalid date format"),
  content: z
    .string({ required_error: "Content is required" })
    .trim()
    .min(1, { message: "Content is required" }),
  status: z.enum(["ForEdit", "Published"]),
  newImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Image is required and must be a valid file",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be under 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, and .png files are accepted."
    )
    .optional(),
});

export type EditArticleSchemaType = z.infer<typeof EditArticleSchema>;
