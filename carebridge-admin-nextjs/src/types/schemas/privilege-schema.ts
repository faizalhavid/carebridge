import { z } from "zod";

export const privilegeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    roles: z.array(z.string()).min(1, "At least one role is required"),
});

export type PrivilegeFormSchema = z.infer<typeof privilegeSchema>;

export type PrivilegeRequest = PrivilegeFormSchema;