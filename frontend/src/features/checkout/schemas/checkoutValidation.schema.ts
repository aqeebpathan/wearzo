import { z } from "zod"

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  address: z.string().min(5, "Address must be at least 5 characters").trim(),
  city: z.string().min(1, "City is required").trim(),
  postalCode: z.string().min(1, "Postal code is required").trim(),
  country: z.string().min(1, "Country is required").trim(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(7, "Phone number is too short")
    .regex(/^[0-9+\-()\s]+$/, "Phone number must be valid")
    .trim(),
})

export type CheckoutFormInput = z.infer<typeof checkoutSchema>
