import prisma from '@/lib/prismaClient'
async function CreateNewMeal(formData) {
  const image = formData.get('image')
  const mealName = formData.get('mealName')
  const time = formData.get('time')
  const notes = formData.get('notes')
  const ingredients = formData.get('ingredients')
  const rating = formData.get('rating')

  try {
    const createMeal = await prisma.meal.create({
      data: {
        image,
        mealName,
        time,
        notes,
        ingredients,
        rating,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
