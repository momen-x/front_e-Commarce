import z from "zod";

export const loginValidation = z.object({
  email: z.string().email().lowercase().trim(),
  password: z.string().min(6),
});

export type loginValidationType = z.infer<typeof loginValidation>;
