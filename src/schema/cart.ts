import z from "zod";

export const AddCartSchema = {
    itemId: z.number(),
    quantity: z.number().min(1),
};