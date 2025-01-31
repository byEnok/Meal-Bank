'use client'
import { Prisma } from '@prisma/client'
import Link from 'next/link'
import { authClient } from '../../../../lib/authClient'
import { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import Loading from '../../../../app/Loading'
import { usePathname } from 'next/navigation'

function LoginForm() {
  const [logInSuccess, setLogInSuccess] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const urlParams = usePathname()
  let returnToUrl = ''

  useEffect(() => {
    if (urlParams.length > 6) returnToUrl = window.location.href.split('=')[1]
  }, [])

  // SIGN IN USER
  async function SignInUser(formData) {
    // try {
    await authClient.signIn.username(
      {
        username: formData.get('username'),
        password: formData.get('password'),
      },
      {
        onRequest: () => {
          setIsLoading(true)
          console.log('Request...')
        },
        onSuccess: () => {
          console.log('Loading...')
          setLogInSuccess(true)
          setIsLoading(false)
          // returnToUrl ? router.replace(returnToUrl) : router.push('/Dashboard')
          router.push('/Dashboard')
        },
        onError: (error) => {
          setLogInSuccess(false)
          console.error('Could not Sign in', error)
        },
      }
    )
    // } catch (error) {
    //   console.error(error)
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <div className='flex flex-col gap-12'>
      <h1 className='text-6xl font-lobster text-center pt-12'>Sign In</h1>
      <div className='flex flex-col items-center mt-auto'>
        <form
          action={(formData) => {
            SignInUser(formData)
            // console.log(formData)
          }}
        >
          <div className={`sign-in-card flex flex-col gap-8 justify-center items-center rounded-2xl bg-background border-2 border-border `}>
            <div className='flex flex-col gap-8 p-12 pb-0'>
              <div className='username flex flex-col gap-2'>
                <label className='text-center text-3xl' htmlFor='username'>
                  User Name
                </label>
                <input className={`border-2 border-border rounded-2xl text-center h-9`} type='text' name='username' placeholder='User Name' />
              </div>
              <div className='password flex flex-col gap-2'>
                <label className='text-center text-3xl' htmlFor='password'>
                  Password
                </label>
                <input className={`border-2 border-border rounded-2xl text-center h-9`} type='password' name='password' placeholder='Password' />
              </div>
            </div>
            <div>
              <button className='bg-backgroundDarker rounded-xl text-lg font-bold p-2 border-2 border-border hover:shadow-custom'>{isLoading ? <Loading /> : 'Log In'}</button>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <Link href='/SignUp' className='rounded-xl font-bold text-center text-xs w-17 p-2 underline transition-transform duration-300 ease-in-out hover:-translate-y-2'>
                New User?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default LoginForm
