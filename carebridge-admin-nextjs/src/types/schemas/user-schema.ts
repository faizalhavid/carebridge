import { z } from "zod";

export const userManagementSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    fullName: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    password: z.string().min(1, "Password is required"),
});

export type UserManagementFormData = z.infer<typeof userManagementSchema>;

export type UserManagementRequestData = UserManagementFormData;