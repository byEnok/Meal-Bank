'use client'
import { ModeToggle } from './Mode-Toggle'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { authClient } from '../../lib/authClient'
import { useRouter } from 'next/navigation'

function Navbar() {
  const [navbarLocked, setNavbarLocked] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const router = useRouter()

  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (!session) {
      setUserLoggedIn(false)
    } else {
      setUserLoggedIn(true)
    }
    // console.log('UserData:', session?.user)
    // console.log('UserLoggedIn:', userLoggedIn)
  }, [session])

  useEffect(() => {
    const checkScrollWheel = () => {
      const scrollY = window.scrollY
      scrollY > 1000 ? setNavbarLocked(true) : setNavbarLocked(false)
    }
    window.addEventListener('scroll', checkScrollWheel)

    return () => {
      window.removeEventListener('scroll', checkScrollWheel)
    }
  }, [])

  function HandleLogOut() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/')
        },
      },
    })
    setUserLoggedIn(false)
  }

  return (
    <div className={` ${navbarLocked ? 'fixed' : ''} top-0 z-50 w-screen flex justify-around items-center bg-backgroundDarker border-b-2 border-border h-20`}>
      {/* <div className='sticky flex justify-center items-center w-screen p-5 bg-backgroundDarker border-b-2 border-border overflow-hidden '> */}
      <div className='relative flex justify-evenly items-center w-full text-[1.3rem] md:gap-24 md:text-3xl lg:text-3xl'>
        <Link href={`/`} className='text-textColor hover:text-textHover'>
          Home
        </Link>
        {userLoggedIn && (
          <Link href='/Dashboard' className='text-textColor hover:text-textHover'>
            Meal Bank
          </Link>
        )}
        {!userLoggedIn ? (
          <Link href='/LogIn' className={`text-textColor hover:text-textHover`}>
            Log In
            {/* <span className='material-symbols-outlined '>login</span> */}
          </Link>
        ) : (
          <button
            className={`text-textColor hover:text-textHover`}
            onClick={() => {
              HandleLogOut()
            }}
          >
            Log Out
          </button>
        )}
        {/* <span className='absolute right-5'> */}
        <ModeToggle />
        {/* </span> */}
      </div>
    </div>
  )
}

export default Navbar
