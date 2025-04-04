'use client'
import { useState } from 'react'
import Link from 'next/link'
import { authClient } from '../../../../lib/authClient'
import { useRouter } from 'next/navigation'
import Loading from '../../../../app/Loading'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

function RegisterUser() {
  const { theme } = useTheme()
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [errorMessages, setErrorMessages] = useState('')
  const [validPassword, setValidPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState('')
  const router = useRouter()
  const iconSize = 30
  // const [registrationResult, setRegistrationResult] = useState({ success: false, error: false })

  const signUpSchema = z
    .object({
      email: z.string().email().endsWith('.com'),
      name: z.string(),
      username: z.string().min(1),
      password: z
        .string()
        .min(6)
        .refine((password) => /^[A-Za-z]+$/.test(password) || /^\d+$/.test(password) || /^(?=.*[A-Za-z])(?=.*\d).*$/i.test(password)),
      passwordConfirm: z
        .string()
        .min(6)
        .refine((passwordConfirm) => /^[A-Za-z]+$/.test(passwordConfirm) || /^\d+$/.test(passwordConfirm) || /^(?=.*[A-Za-z])(?=.*\d).*$/i.test(passwordConfirm)),
    })
    .refine(
      ({ password, passwordConfirm }) => {
        if (password !== passwordConfirm) return false
        // LETTERS, NUMBERS OR BOTH
        const validPassword = /^[A-Za-z]+$/.test(password) || /^\d+$/.test(password) || /^(?=.*[A-Za-z])(?=.*\d).*$/i.test(password)
        return validPassword
      },
      {
        message: 'The passwords does not match',
        path: ['passwordConfirm'],
      }
    )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  })

  function CreateUser(formData) {
    const userData = { email: formData.get('email'), name: formData.get('name'), username: formData.get('username'), password: formData.get('password'), passwordConfirm: formData.get('passwordConfirm') }
    const result = signUpSchema.safeParse(userData)

    if (!result.success) {
      console.log('NOT SUCCESS', result.error.issues)
      // return console.error(result.error.issues)
    }

    try {
      console.log(result)
      setIsLoading(true)
      // authClient.signUp.email({
      //   userData,
      // })
    } catch (error) {
      console.error(result.error.issues)
    } finally {
      setIsLoading(false)
    }
  }

  // CREATING NEW USER FUNCTION
  // async function CreateUser(formData) {
  //   const passwordConfirmed = formData.get('password') === formData.get('passwordConfirm') ? true : false
  //   setIsLoading(true)

  //   try {
  //     if (passwordConfirmed) {
  //       const { data, error } = await authClient.signUp.email({
  //         email: formData.get('email'),
  //         name: formData.get('name'),
  //         username: formData.get('username'),
  //         password: formData.get('password'),
  //         fetchOptions: {
  //           onSuccess: () => {
  //             router.push('/LogIn')
  //           },
  //           onError: (error) => {
  //             console.error('Sign Up Error:', error)
  //           },
  //         },
  //       })
  //       // setRegistrationResult({ success: true, error: false })
  //       console.log('Sign Up Email Response | Data: ', data, 'Error: ', error)
  //     }
  //   } catch (error) {
  //     // setRegistrationResult({ success: false, error: true })
  //     console.error('Registration Failed! \nerror: ', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-6xl font-lobster text-center pt-12'>Create Account</h1>
      <div className='flex flex-col justify-center items-center gap-12 '>
        <form
          onSubmit={handleSubmit(CreateUser)}
          // className='border-2 border-border rounded-lg p-5 bg-red-400 '
          className='grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 place-items-center gap-3 md:gap-8 font-semibold  border-2 border-border rounded-lg px-2 md:p-12 md:pb-5'
        >
          {/* <form
          action={(formData) => {
            CreateUser(formData)
          }}
          className='grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-3 place-items-center gap-3 md:gap-8 font-semibold  border-2 border-border rounded-lg px-2 md:p-12 md:pb-5'
          > */}
          {/* EMAIL */}
          <div className='flex flex-col gap-2 md:gap-4'>
            <label className='text-center md:text-2xl' htmlFor='email'>
              Email
            </label>
            <input {...register('email')} className='w-full flex-1 border-2 border-border rounded-2xl text-center h-9 ' type='email' name='email' placeholder='email' defaultValue='@gmail.com' />
          </div>
          {/* NAME */}
          <div className='flex flex-col gap-2 md:gap-4'>
            <label className='text-center md:text-2xl' htmlFor='name'>
              Name
            </label>
            <input {...register('name')} className='w-full flex-1 border-2 border-border rounded-2xl text-center h-9' type='text' name='name' placeholder='Name' defaultValue='Frank' />
          </div>
          {/* USER NAME */}
          <div className='username-container flex flex-col gap-2 md:gap-4'>
            <label className='text-center md:text-2xl' htmlFor='username'>
              User Name
            </label>
            <input {...register('username')} className='w-full flex-1 border-2 border-border rounded-2xl text-center h-9' type='text' name='username' placeholder='User Name' defaultValue='Frank' />
          </div>

          {/* IMAGE */}
          <div className=''>
            <label htmlFor='image' className={`flex flex-col gap-3 cursor-pointer justify-center border-2 border-dotted border-border rounded-lg p-3  ${theme === 'light' ? 'bg-zinc-400' : 'bg-zinc-900'} `}>
              <div class='flex justify-center items-center'>
                <Image src='/icons/SVG/cloud-upload.svg' width={iconSize} height={iconSize} alt='File Icon' />
              </div>
              <div className='flex justify-center items-center '>
                <span className='font-semibold text-xs md:text-sm'>Click to upload image</span>
              </div>
              <input {...register('image')} id='file' name='image' type='file' accept='image/*' className='hidden flex-1' />
            </label>
          </div>

          {/* ENTER PASSWORD */}
          <div className='password flex flex-col gap-2 md:gap-4'>
            <label className='text-center md:text-2xl' htmlFor='password'>
              Password
              {errors?.password && <span>{errors.password.message}</span>}
            </label>
            <input
              onChange={(e) => setValidPassword(e.target.value)}
              defaultValue='123123123'
              className={` w-full flex-1 rounded-2xl text-center h-9 border-2 ${passwordMatch.length && validPassword.length > 3 && passwordMatch === validPassword ? 'border-green-500' : passwordMatch.length && validPassword.length > 3 && passwordMatch !== validPassword ? 'border-red-500' : ''}`}
              type='password'
              name='password'
              placeholder='Enter Password'
              {...register('password')}
            />
          </div>

          {/* CONFIRM PASSWORD  */}
          <div className='password flex flex-col gap-2 md:gap-4 '>
            <label className='text-center md:text-2xl' htmlFor='confirmPassword'>
              Confirm Password
              {errors?.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
            </label>
            <input
              onChange={(e) => setPasswordMatch(e.target.value)}
              defaultValue='123123123'
              className={`UserFeedbackInput w-full flex-1 rounded-2xl text-center h-9 border-2  ${validPassword.length && passwordMatch.length > 3 && validPassword === passwordMatch ? 'border-green-500' : validPassword.length && passwordMatch.length > 3 && validPassword !== passwordMatch ? 'border-red-500' : ''}`}
              type='password'
              name='confirmPassword'
              placeholder='Re-Enter Password'
              {...register('passwordConfirm')}
              // onFocus={(e) => {
              //   e.target.style.borderColor = e.target.value.length > 3 && e.target.value === password ? 'green' : 'red'
              // }}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className='col-span-full mt-5 md:mt-0'>
            <button className='flex w-full flex-1 rounded-xl text-lg font-bold p-2 border-2 border-border bg-backgroundDarker hover:shadow-custom' disabled={isLoading}>
              {isLoading ? <Loading /> : 'Create Account'}
            </button>
          </div>
          <div className='col-span-full flex'>
            <Link href='/LogIn' className='font-bold text-center text-xs pb-4 underline transition-transform duration-300 ease-in-out hover:-translate-y-2'>
              Allready have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterUser
