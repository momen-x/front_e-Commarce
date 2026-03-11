import z from "zod";

export const orderSchema = z.object({
  user: z.string(),
  orderItemsId: z.array(z.string()),
  phone: z.string(),
  address: z.string(),
  customerEmail: z.string(),
  totalPrice: z.number(),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]).optional(),
});

export const orderItemSchema = z.object({
  product: z.string(),
  quantity: z.number(),
  price: z.number().min(0),
});


export type orderSchemaType = z.infer<typeof orderSchema>;
export type orderItemSchemaType = z.infer<typeof orderItemSchema>;