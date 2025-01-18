import { z } from "zod";

export const CompanySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  status: z.enum(["Active", "Inactive"]),
  logo: z.string({ required_error: "Logo is required" }),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;
