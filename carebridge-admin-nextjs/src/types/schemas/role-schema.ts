import { z } from "zod";

export const roleSchema = z.object({
    name: z.string().min(1, "Name is required"),
    privileges: z.array(z.string()).min(1, "At least one privilege is required"),
});

export type RoleFormSchema = z.infer<typeof roleSchema>;

export type RoleRequest = RoleFormSchema;