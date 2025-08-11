import { z } from "zod";

// Main schema with conditional validation
export const biodataSchema = z.object({
    fullName: z.string().min(1, "Name is required"),
    mobilePhone: z.string()
        .min(1, "Mobile phone is required")
        .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, "Invalid Indonesian mobile phone number"),
    imagePath: z.string().min(1, "Image path is required"),
    address: z.string().min(1, "Address is required"),
});

export type BiodataFormSchema = z.infer<typeof biodataSchema>;
export type UserRequest = BiodataFormSchema;