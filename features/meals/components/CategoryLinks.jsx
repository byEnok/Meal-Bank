'use client'
import { useEffect } from 'react'
import Link from 'next/link'

// export const links = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Healthiest Meals', 'Another', 'new', 'Candy Stuff']
export const links = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']

function CategoryLinks(meals) {
  // console.log('CategoryLINKS', meals)
  // const categoryTitles = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']
  const categories = [meals.stateCode, meals.postalCode, meals.country, meals.state, meals.city]
  return (
    <main className='mt-6'>
      <div className='flex flex-wrap justify-center items-center max-w-screen gap-3 border-b-2 border-b-border md:text-3xl'>
        {categories.map((link, index) => (
          <div key={index} className='p-1 pt-0 border-2 border-b-0 border-border rounded-[0.2rem] hover:bg-backgroundDarker'>
            <button onClick={() => changeContent()} key={index} href={`./${link}`.toLowerCase()} className='text-xl md:text-2xl'>
              {link}
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default CategoryLinks
