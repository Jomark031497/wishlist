import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must contain at least 3 character(s)')
    .max(150, 'Username must not exceed 150 character(s)'),
  password: z
    .string()
    .min(6, 'Password must contain at least 6 character(s)')
    .max(150, 'Password must not exceed 150 character(s)'),
})

export type LoginInputs = z.infer<typeof loginSchema>
