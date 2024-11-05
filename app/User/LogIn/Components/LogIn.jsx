import { Prisma } from '@prisma/client'
import Link from 'next/link'

function LoginForm() {
  return (
    <div className='flex flex-col items-center mt-auto'>
      <form action={signIn()}>
        <div className='sign-in-card flex flex-col gap-8 justify-center items-center rounded-2xl bg-background'>
          <div className='flex flex-col gap-8 p-12 pb-0'>
            <div className='username flex flex-col gap-2'>
              <label className='text-center text-3xl' htmlFor='username'>
                User Name
              </label>
              <input className='border-2 border-border rounded-2xl text-center h-9' type='text' name='username' placeholder='User Name' />
            </div>
            <div className='password flex flex-col gap-2'>
              <label className='text-center text-3xl' htmlFor='password'>
                Password
              </label>
              <input className='rounded-2xl text-center h-9 border-2 border-border' type='password' name='password' placeholder='Password' />
            </div>
          </div>
          <div>
            <button className='bg-backgroundDarker rounded-xl text-lg font-bold p-2 border-2 border-border hover:shadow-custom'>Log In</button>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <Link href='/CreateUser' className='rounded-xl font-bold text-center text-xs w-17 p-2 underline transition-transform duration-300 ease-in-out hover:-translate-y-2'>
              New User?
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
export default LoginForm
