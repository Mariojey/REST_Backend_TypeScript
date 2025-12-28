import {z} from "zod";

export const SignUpSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(100)
})

export const LocalizationSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string().min(5).max(10),
    country: z.string()
});

export const UpdateUserSchema = z.object({

    username: z.string().min(3).max(30).optional(),
    defaultShippingLocalization: z.number().optional(),
    defaultBillingLocalization: z.number().optional()

})