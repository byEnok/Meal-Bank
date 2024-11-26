import * as z from 'zod'

export const TESTERSCHEMA = z.object({
  username: z.string().min(2, { message: 'Name must be min 2 characters' }).max(12, { message: 'Cannot be longer than 12 characters' }),
  userId: z.string().min(5),
})
