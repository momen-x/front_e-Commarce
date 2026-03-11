import z from "zod";

export const ChangePasswordValidation = z
  .object({
    oldPassword: z.string().min(1, "the old password is required"),
    newPassword: z
      .string()
      .min(8, "the new password must be at least 8 characters long"),
    confirmNewPassword: z
      .string()
      .min(8, "the confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordType = z.infer<typeof ChangePasswordValidation>;
