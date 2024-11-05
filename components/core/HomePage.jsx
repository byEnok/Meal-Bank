'use client'
import Link from 'next/link'

function HomePage() {
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-16  h-full'>
        <div className='flex flex-col gap-4 font-lobster items-center select-none mt-20 md:mt-3 lg:mt-0'>
          <h1 className={` text-5xl md:text-8xl lg:text-8xl`}>Welcome to</h1>
          <h2 className={` text-5xl md:text-8xl lg:text-8xl`}>Meal Bank</h2>
        </div>

        <div className='flex flex-col justify-center items-center gap-6 text-balance'>
          {/* md:mx-36 md:pl-20 md:pr-20 */}
          <div className='intro-text flex justify-center items-center  text-center text-l  text-2xl md:text-3xl lg:text-4xl'>Meal Bank provides a simple overview of all your favorite meals, aiming to reduce the stress of deciding what to eat next.</div>

          <div className='intro-text flex justify-center items-center  text-center text-l  text-2xl md:text-3xl lg:text-4xl'>
            Easily view the names of all your favorite meals in one place. Check preparation time, ingredients, and images at a glance. Customize the details for each meal as you like!
          </div>

          <div className='flex gap-5 '>
            <Link href='/LogIn' className='font-bold bg-backgound p-1.5 border-2 border-border rounded-lg hover:shadow-custom  hover:bg-backgroundDarker'>
              Log In
            </Link>
            <Link href='/CreateUser' className='font-bold bg-background border-border p-1.5 border-2 rounded-lg hover:shadow-custom hover:bg-backgroundDarker'>
              Create User
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
