import z from "zod";

export const addCategorySchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3),
});
export const UpdateCategorySchema = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().min(3).optional(),
});

export type addCategorySchemaType = z.infer<typeof addCategorySchema>;
export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;
