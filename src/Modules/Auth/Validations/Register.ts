import z from "zod";

export const registerValidation = z.object({
  firstName: z.string().min(3).max(50).trim(),
  lastName: z.string().min(3).max(50).trim(),
  email: z.string().email().lowercase().trim(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export const registerSchemaInputs = z.object({
  firstName: z.string().min(3).max(50).trim(),
  lastName: z.string().min(3).max(50).trim(),
  email: z.string().email().min(3).max(50).trim(),
  password: z.string().min(8).trim(),
});

export type registerSchemaInputsType = z.infer<typeof registerSchemaInputs>;
export type registerValidationType = z.infer<typeof registerValidation>;
