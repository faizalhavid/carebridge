import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    fullName: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    password: z.string().min(1, "Password is required"),
});

export type UserFormSchema = z.infer<typeof userSchema>;

export type UserRequest = UserFormSchema;