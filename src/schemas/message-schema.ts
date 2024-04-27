import { z } from 'zod'

export const MessageSchema = z.object({
  from: z.string().email(),
  to: z.string().email(),
  subject: z.string(),
  message: z.string()
});