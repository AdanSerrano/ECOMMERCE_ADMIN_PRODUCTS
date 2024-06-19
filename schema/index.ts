import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(2).max(50),
})


export const BillboardSchema = z.object({
    label: z.string().min(2),
    imageUrl: z.string().min(2),
})

export const CategorySchema = z.object({
    name: z.string().min(2),
    billboardId: z.string().min(1)
})

export const SizesSchema = z.object({
    name: z.string().min(2),
    value: z.string().min(1)
})
export const ColorSchema = z.object({
    name: z.string().min(2),
    value: z.string().min(1)
})

export const ProductsSchema = z.object({
    name: z.string().min(2),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
})

export type SettingsFormValues = z.infer<typeof formSchema>
export type BillboardFormValues = z.infer<typeof BillboardSchema>
export type CategoryFormValues = z.infer<typeof CategorySchema>
export type SizesFormValues = z.infer<typeof SizesSchema>
export type ColorsFormValues = z.infer<typeof ColorSchema>
export type ProductsFormValues = z.infer<typeof ProductsSchema>