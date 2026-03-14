import z from "zod";

export const updatePasswordValidation = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export const forgotPasswordValidation = z.object({
  email: z.string().email().lowercase().trim(),
});

export const resetPasswordValidation = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type updatePasswordValidationType = z.infer<
  typeof updatePasswordValidation
>;
export type forgotPasswordValidationType = z.infer<
  typeof forgotPasswordValidation
>;
export type resetPasswordValidationType = z.infer<
  typeof resetPasswordValidation
>;
