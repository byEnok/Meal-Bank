'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'

// export const links = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Healthiest Meals', 'Another', 'new', 'Candy Stuff']
export const links = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']

function CategoryLinks(categories) {
  const categoryTitles = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']
  return (
    <>
      <div className='flex flex-wrap justify-center items-center max-w-screen gap-3 border-b-2 border-b-border md:text-3xl'>
        {categoryTitles.map((link, index) => (
          <div className='p-1 pt-0 border-2 border-b-0 border-border rounded-[0.2rem] hover:bg-backgroundDarker'>
            <Link key={index} href={`/meals/category/${link}`.toLowerCase()} className='text-xl md:text-2xl'>
              {link}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default CategoryLinks
