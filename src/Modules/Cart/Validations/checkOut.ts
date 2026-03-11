import z from "zod";
export const checkoutSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[0-9+\s-]+$/, "Invalid phone number"),
  address: z
    .string()
    .min(10, "Please enter your full address")
    .max(200, "Address too long"),
  customerEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;