import * as z from 'zod'

export const TESTERSCHEMA = z.object({
  name: z.string().min(2, { message: 'Name must be min 2 characters' }).max(60, { message: 'Cannot be longer than 60 characters' }),
  category: z.string().min(2, { message: 'Select a category!' }),
  rating: z.number().min(1, { message: 'Rate the meal!' }),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 1 * 1024 * 1024, { message: 'Image size too big! Cannot be bigger than 1MB' })
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type), { message: 'Invalid file type!\nImage must a JPEG, PNG or WebP.' })
    .optional(),
  userId: z.string().min(5),
})
