import { z } from "zod";
import { biodataSchema } from "./biodata-schema";

// Main schema with conditional validation
export const userSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    biodata: biodataSchema
        .omit({
            mobilePhone: true,
            imagePath: true,
        })
        .optional(),
    password: z.string(),
});

export type UserFormSchema = z.infer<typeof userSchema>;
export type UserRequest = UserFormSchema;