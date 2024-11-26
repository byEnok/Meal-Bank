'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

function ShowMeal(meal) {
  const { theme } = useTheme()

  // console.log('SHOWMEAL: ', meal)
  const userInfo = [meal.image, meal.username, meal.height, meal.eyeColor]

  const categoryTitles = ['✅', 'Meal Name', 'Time', 'Rating']
  // const previewData = ['Image', 'Hjemmelaget Pizza', '2h', '10/10']
  const dataStyling = 'flex flex-wrap text-center rounded-lg p-1'
  const dragAndDropColor = theme === 'dark' ? 'bg-gray-400' : 'bg-black'

  return (
    <div className='py-2'>
      {/* Grid Layout On Data */}
      <div className='mealDataContainer py-2 rounded-lg gap-2 p-2 mx-auto border-2 border-border'>
        <div className='dragAndDropContainer border-r-2 border-border pr-6 mr-auto h-full cursor-pointer'>
          <div className={`dragAndDropLine ${dragAndDropColor} w-8 h-2 rounded-xl md:w-11 md:h-2.3 `}></div>
          <div className={`dragAndDropLine ${dragAndDropColor} w-8 h-2 rounded-xl md:w-11 md:h-2.3 `}></div>
          <div className={`dragAndDropLine ${dragAndDropColor} w-8 h-2 rounded-xl md:w-11 md:h-2.3 `}></div>
        </div>

        {categoryTitles.map((title, index) => (
          <div key={index} className='flex justify-center items-center text-center w-full border-2 border-border rounded-lg'>
            <span key={index} className={`${dataStyling} font-bold text-md md:text-2xl border-border`}>
              {title}
            </span>
          </div>
        ))}

        {userInfo.map((data, index) => (
          <div className=''>
            {data === meal.image ? (
              <Image key={index} src={data} width={100} height={100} alt={`${meal.username}'s image`} />
            ) : (
              <span key={index} className={`${dataStyling} text-md md:text-xl `}>
                {data}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowMeal
