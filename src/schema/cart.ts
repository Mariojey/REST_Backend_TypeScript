import z from "zod";

export const AddCartSchema = z.object({
    itemId: z.number(),
    quantity: z.number().min(1),
});

export const UpdateQuantitySchema = z.object({
    quantity: z.number()
});