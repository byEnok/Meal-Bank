'use client'

import React from 'react'
import { useTheme } from 'next-themes'

function ShowMeal() {
  const { theme } = useTheme()

  const categoryTitles = ['✅', 'Meal Name', 'Time', 'Rating']
  const previewData = ['Image', 'Hjemmelaget Pizza', '2h', '10/10']
  const dataStyling = 'flex flex-wrap text-center rounded-lg p-1'

  const dragAndDropColor = theme === 'dark' ? 'bg-gray-400' : 'bg-black'

  return (
    <div className=''>
      {/* Grid Layout On Data */}
      <div className='mealDataContainer py-2 rounded-lg gap-2 p-2 mx-auto border-2 border-border'>
        <div className='dragAndDropContainer border-r-2 border-border pr-6 mr-auto h-full cursor-pointer'>
          <div className={`dragAndDropLine ${dragAndDropColor} w-8 h-2 rounded-xl md:w-11 md:h-2.3 `}></div>
          <div className={`dragAndDropLine ${dragAndDropColor} w-8 h-2 rounded-xl md:w-11 md:h-2.3 `}></div>
          <div className={`dragAndDropLine ${dragAndDropColor} w-8 h-2 rounded-xl md:w-11 md:h-2.3 `}></div>
        </div>

        {categoryTitles.map((category, index) => (
          <div className='flex justify-center items-center text-center w-full border-2 border-border rounded-lg'>
            <span key={index} className={`${dataStyling} font-bold text-md md:text-2xl border-border`}>
              {category}
            </span>
          </div>
        ))}

        {previewData.map((data, index) => (
          // <div className='border-2 border-border'>
          <span key={index} className={`${dataStyling} text-md md:text-xl `}>
            {data}
          </span>
          // </div>
        ))}
      </div>
    </div>
  )
}

export default ShowMeal
