'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { authClient } from '../../lib/authClient'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function HomePage() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [toasterTest, setToasterTest] = useState(false)
  const notify = () => toast('Welcome! What will you cook today?😀')
  // const notify = toast('Welcome! What will you cook today?😀')

  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (!session || !session.user) {
      setUserLoggedIn(false)
    } else {
      setUserLoggedIn(true)
    }
  }, [session])

  return (
    <>
      <div className='homepage flex flex-col justify-center items-center gap-12 '>
        <div className='flex flex-col gap-4 font-lobster items-center select-none pt-20 md:pt-10 '>
          <h1 className={` text-5xl md:text-8xl lg:text-8xl`}>Welcome to</h1>
          <h2 className={` text-5xl md:text-8xl lg:text-8xl`}>Meal Bank</h2>
        </div>

        <button onClick={notify}>NOTIFY ME</button>
        <div className='flex flex-col justify-center items-center gap-6 text-balance '>
          {/* md:mx-36 md:pl-20 md:pr-20 */}
          <div className='intro-text flex justify-center items-center  text-center text-l  text-2xl md:text-3xl lg:text-3xl'>Meal Bank provides a simple overview of all your favorite meals, aiming to reduce the stress of deciding what to eat next.</div>

          <div className='intro-text flex justify-center items-center  text-center text-l  text-2xl md:text-3xl lg:text-3xl'>
            Easily view the names of all your favorite meals in one place. Check preparation time, ingredients, and images at a glance. Customize the details for each meal as you like!
          </div>

          {!userLoggedIn && (
            <div className='flex gap-5 '>
              <Link href='/LogIn' className='font-bold bg-backgound p-1.5 border-2 border-border rounded-lg hover:shadow-custom  hover:bg-backgroundDarker'>
                Log In
              </Link>
              <Link href='/SignUp' className='font-bold bg-background p-1.5 border-2 border-border  rounded-lg hover:shadow-custom hover:bg-backgroundDarker'>
                Create User
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
