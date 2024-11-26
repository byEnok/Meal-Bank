import * as z from 'zod'

export const newMealSchema = z.object({
  name: z.string().min(2, { message: 'Name must be min 2 characters' }),
  rating: z.number().min(1, {
    message: 'Meal must have a rating!',
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 1 * 1024 * 1024, { message: 'Image size too big! Cannot be bigger than 1MB' })
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type), { message: 'Invalid file type!\nImage must a JPEG, PNG or WebP.' })
    .optional(),
  comments: z.string().min(1, { message: 'Commentssssss ' }).optional(),
  category: z.string().min(3, { message: 'Must create or select a category!' }),
  timeToCook: z.string().min(5, { message: 'The time must be at least 5 characters!' }).optional(),
  notes: z.string().min(5, { message: 'Notes must have at least 5 characters!' }).optional(),
  instructions: z.string().min(5, { message: 'Instructions must be at least 10 characters long' }).optional(),
  ingredients: z.string().min(5, { message: 'Ingredients must be have at least 5 characters!' }).optional(),
  userID: z.string().min(1),
})
