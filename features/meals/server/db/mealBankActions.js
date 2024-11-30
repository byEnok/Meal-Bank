'use server'
import prisma from '../../../../lib/prismaClient'
import { newMealSchema } from '../../schemas/newMealSchema'
import * as z from 'zod'
import { revalidatePath } from 'next/cache'
import { actionClient } from '../../../../lib/safe-actions'
import supabase from '../../../../lib/SupabaseClient'
import { TESTERSCHEMA } from '../../schemas/TESTERSCHEMA'

export const TESTERDB = actionClient.schema(TESTERSCHEMA).action(async ({ parsedInput }) => {
  const values = parsedInput

  try {
    if (values) {
      return { success: true, message: 'SERVER: Creation Success!' }
    } else {
      return { success: false, message: 'SERVER: Creation FAILURE!' }
    }
  } catch (e) {
    console.error('TESTING FAILED...', e)
  }
})

// Generate Image File Path
export async function GenerateFilePath(userId, subfolder, file) {
  const timeStamp = new Date().getTime().toFixed(4)
  const fileExtension = file.name.split('.').pop()
  const sanitizedFileName = file.name.split('.').shift().replace(/\s+/g, '-')
  return `${userId}/${subfolder}/${sanitizedFileName}_${timeStamp}.${fileExtension}`
}

// Upload Meal image to bucket
export async function ImageUpload(userId, subfolder, file) {
  try {
    // Get Image File Path
    const filePath = GenerateFilePath(userId, subfolder, file)

    // Upload Image to correct folder - meals | profile
    const { data, error } = await supabase.storage.from('mealbank-images').upload(filePath, file)
    if (error) {
      console.error('Image Upload Error:', error.message)
      throw new Error('Image Upload Failed')
    }

    //  Get Image URL from Supabase
    const { publicUrl } = supabase.storage.from('mealbank-images').getPublicUrl(filePath)
    return publicUrl
  } catch (error) {
    console.error(error)
  }
}

// CREATE NEW MEAL
export const CreateNewMeal = actionClient.schema(newMealSchema).action(async ({ parsedInput: { values } }) => {
  try {
    if (!values) return { error: 'Something went wrong' }
    let imageUrl = null

    if (values.image) {
      imageUrl = await ImageUpload(values.userID, 'meal', values.image)
    }

    const newMeal = await prisma.meal.create({
      data: {
        ...values,
        image: imageUrl,
      },
    })

    revalidatePath('/Dashboard/meals/')

    if (!newMeal) return { error: 'Could not create meal' }

    return { success: true, meal: newMeal }
  } catch (error) {
    console.error('Error in CreateNewMeal:', error)
    return { error: 'Failed to create meal. Please try again.' }
  }
})

export async function GetMeals(userId) {
  try {
    const userMeals = await prisma.meal.findMany({
      where: { userId },
    })
    if (!userMeals) {
      return { success: false }
    }

    return { success: true, userMeals }
  } catch (e) {
    console.error('Fetcing of Data Failed!')
    console.error('Error: ', e)
  }
}

// DELETE EXISTING MEAL

// EDIT EXISTING MEAL
// const mealBankDB = {
//   GetMeals,
//   CreateNewMeal,
// }
// export default mealBankDB
