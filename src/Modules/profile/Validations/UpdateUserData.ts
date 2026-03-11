import  z from "zod";

export const UpdateUserSchema = z.object({
  firstName: z.string().min(1, "the first name is required").optional(),
  lastName: z.string().min(1, "the last name is required").optional(),
});

export const AddOrChangeUserImage=z.object({
image:z.instanceof(File)
})

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
export type AddOrChangeUserImageType=z.infer<typeof AddOrChangeUserImage>

