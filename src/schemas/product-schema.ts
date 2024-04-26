import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  tags: z.string()
})

export const UpdateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().optional(),
  tags: z.string().min(1).optional()
})