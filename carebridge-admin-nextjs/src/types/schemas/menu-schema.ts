import { z } from "zod";

export const menuSchema = z.object({
    name: z.string().min(1, "Name is required"),
    url: z.string().min(1, "url is required"),
    parentId: z.string(),
    children: z.array(z.string()),
    bigIcon: z.string().min(1, "big_icon is required"),
    smallIcon: z.string().min(1, "small_icon is required")

});

export type MenuFormSchema = z.infer<typeof menuSchema>;

export type MenuRequest = MenuFormSchema;