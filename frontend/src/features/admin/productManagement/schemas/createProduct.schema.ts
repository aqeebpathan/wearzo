import { z } from "zod"

export const productSchema = z
  .object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.preprocess((val) => Number(val), z.number().min(1)),
    discountPrice: z.preprocess((val) => Number(val), z.number().min(1)),
    gender: z.enum(["men", "women", "unisex"]),
    material: z.string().min(1),
    brand: z.string().min(1),
    collections: z.string().min(1),
    sku: z.string().min(1),
    countInStock: z.preprocess((val) => Number(val), z.number().nonnegative()),
    sizes: z.string().min(1),
    colors: z.string().min(1),
    productImages: z
      .union([
        z.instanceof(FileList).transform((val) => Array.from(val)),
        z.array(z.instanceof(File)),
      ])
      .refine((val) => val.length >= 2, {
        message: "At least 2 images are required",
      })
      .refine((val) => val.length <= 4, {
        message: "You can upload up to 4 images only",
      }),
    category: z.string().min(1),
    tags: z.string().min(1),
    isFeatured: z.enum(["true", "false"]).transform((val) => val === "true"),
    isPublished: z.enum(["true", "false"]).transform((val) => val === "true"),
  })
  .refine((data) => data.discountPrice <= data.price, {
    path: ["discountPrice"],
    message: "Discount price cannot be greater than base price",
  })

export type ProductFormInput = z.input<typeof productSchema>
export type ProductFormOutput = z.output<typeof productSchema>
