import { z } from "zod";

export const ArticleSchema = z.object({
  companyId: z.string({ required_error: "Company is required" }),
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, { message: "Title is required" }),
  link: z.string({ required_error: "Link is required" }).url(),
  date: z.string({ required_error: "Date is required" }).datetime(),
  content: z
    .string({ required_error: "Content is required" })
    .trim()
    .min(1, { message: "Content is required" }),
  image: z
    .custom<File>((value) => value instanceof File, {
      message: "Invalid file. Please upload a valid file.",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed.",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must not exceed 5MB.",
    }),
});

export type ArticleSchemaType = z.infer<typeof ArticleSchema>;
