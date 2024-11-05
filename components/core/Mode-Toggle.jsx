'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Button } from '@/components/shadcn/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <Button className='h-9 w-10  md:h-11 md:w-12 z-50 ' onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))} variant='outline' size={'iconXL'}>
        {theme === 'dark' ? (
          <div className='transition-transform duration-300 ease-in-out hover:text-black '>
            <Sun className={`hover:rotate-180 transition-transform duration-500 ease-in-out`} />
          </div>
        ) : (
          <div className='transition-transform duration-500 ease-in-out hover:text-white '>
            <Moon className={` hover:rotate-45 transition-transform duration-500 ease-in-out `} />
          </div>
        )}
      </Button>
    </>
  )
}
