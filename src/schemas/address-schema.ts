import { z } from 'zod'

export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  userId: z.number()
});
