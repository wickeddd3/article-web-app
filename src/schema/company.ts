import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const CompanySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  status: z.enum(["Active", "Inactive"]),
  logo: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Logo is required and must be a valid file",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be under 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, and .png files are accepted."
    ),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;

export const EditCompanySchema = z.object({
  id: z.number(),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  status: z.enum(["Active", "Inactive"]),
  // logo: z
  //   .string({ required_error: "Logo is required" })
  //   .trim()
  //   .min(1, { message: "Logo is required" }),
  newLogo: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Logo is required and must be a valid file",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be under 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg, and .png files are accepted."
    )
    .optional(),
});

export type EditCompanySchemaType = z.infer<typeof EditCompanySchema>;
