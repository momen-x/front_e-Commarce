import z from "zod";

export const addProductSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3),
  price: z.coerce.number().positive(),
  categoryId: z.string(),
  image: z.instanceof(File).optional(),
});

export const updateProductSchema = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().min(3).optional(),
  price: z.coerce.number().positive().optional(),
  categoryId: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export type addProductSchemaType = z.infer<typeof addProductSchema>;
export type updateProductSchemaType = z.infer<typeof updateProductSchema>;
