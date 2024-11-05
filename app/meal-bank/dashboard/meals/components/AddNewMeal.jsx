'use client'
import { links } from './CategoryLinks'

function AddNewMeal() {
  const mealCategories = links

  async function SendMealData(formData) {
    const addMeal = await CreateNewMeal(formData)
    // console.log('NEW MEAL ADDED')
  }

  return (
    <main>
      <form action={SendMealData(formData)} className='flex flex-wrap justify-center items-center gap-5 border-b-8 pb-12 border-border'>
        <div className='w-screen flex justify-center items-center gap-3 border-red-500'>
          <input name='mealName' type='text' className='addMealName w-3/6 border-2 border-border p-1 rounded-lg text-center' placeholder='Legg til måltid...' />
          <button type='submit' className='h-10 w-10 border-2 rounded-lg'>
            Add
          </button>
        </div>
        <div className=' w-full flex justify-center '>
          <select name='categories' className='custom-select appearance-none flex justify-center items-center relative w-5/12 text-xl text-center border-2 border-border rounded-xl p-1 bg-backgroundDarker cursor-pointer '>
            {mealCategories.map((option, index) => (
              <option value={option} key={index} className='category-options cursor-pointer focus:border-focusColor'>
                {option}
              </option>
            ))}
          </select>
        </div>
      </form>
    </main>
  )
}

export default AddNewMeal
