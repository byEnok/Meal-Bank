'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

// export const links = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Healthiest Meals', 'Another', 'new', 'Candy Stuff']
export const links = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']

function CategoryLinks(meals) {
  const router = useRouter()
  const urlPath = usePathname()

  // console.log('CategoryLINKS', meals)
  // const categoryTitles = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']
  const categories = [meals.stateCode, meals.postalCode, meals.country, meals.state, meals.city]

  const links = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']
  return (
    <main className=''>
      <div className='flex flex-wrap justify-center items-center max-w-screen gap-20 border-b-[1px] border-b-border md:text-3xl'>
        {links.map((link, index) => (
          <div key={index} className='p-1 pt-0 border-2 border-b-0 border-border rounded-[0.2rem] hover:bg-backgroundDarker'>
            <button onClick={() => router.push(`Dashboard/meals/${link}`)} key={index} className='text-xl md:text-2xl'>
              {link}
            </button>
            {/* <button onClick={() => changeContent()} key={index} href={`/${link}`.toLowerCase()} className='text-xl md:text-2xl'>
              {link}
            </button> */}
          </div>
        ))}
      </div>
    </main>
  )
}

export default CategoryLinks
