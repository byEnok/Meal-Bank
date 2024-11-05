'use client'

import React from 'react'
import { ModeToggle } from './Mode-Toggle'
import Link from 'next/link'

function Navbar() {
  const userLoggedIn = true

  return (
    // <div className='relative'>
    <div className='sticky flex justify-center items-center w-screen p-5 bg-backgroundDarker border-b-2 border-border overflow-hidden '>
      <div className='flex text-[1.3rem] justify-evenly items-center w-screen md:gap-24 md:text-3xl lg:text-4xl'>
        <Link href={`/`} className='text-textColor hover:text-textHover'>
          Home
        </Link>
        {userLoggedIn && (
          <Link href='/meal-bank/dashboard' className='text-textColor hover:text-textHover'>
            Meal Bank
          </Link>
        )}
        <Link href='#' className={`text-textColor hover:text-textHover`}>
          {userLoggedIn ? 'Log Out' : 'Log In'}
          {/* <span className='material-symbols-outlined '>login</span> */}
        </Link>
        {/* <span>
          <ModeToggle />
        </span> */}
      </div>
      <ModeToggle />
    </div>
    // </div>
  )
}

export default Navbar
