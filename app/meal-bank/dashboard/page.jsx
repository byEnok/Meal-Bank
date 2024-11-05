import Navbar from '@/components/core/Navbar'
import React from 'react'
import Link from 'next/link'

// import { links } from './meal-bank/dashboard/meals/components/CategoryLinks'
function page() {
  return (
    <>
      <Navbar />

      <div className='w-36 h-44 bg-backgroundDarker'>
        <Link href={`./dashboard/meals/breakfast`}>BreakFast</Link>
      </div>
    </>
  )
}

export default page
