'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../globalComponents/shadcn/button'
import { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '../../../globalComponents/shadcn/form'
import { Input } from '../../../globalComponents/shadcn/input'

import { TESTERSCHEMA } from '../schemas/TESTERSCHEMA'
import Loading from '../../../app/Loading'
import { Textarea } from '../../../globalComponents/shadcn/textarea'
import { TESTERDB } from '../server/db/mealBankActions'

import { revalidatePath } from 'next/cache'
import { useState, useEffect } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'react-toastify'

function TESTER({ sessionData }) {
  const { session, user } = sessionData
  const userId = user.id
  // console.log(typeof userID)
  const [resultMessage, setResultMessage] = useState(false)
  const notifyMessage = () => toast(resultMessage)
  const [isLoading, setIsLoading] = useState(false)
  const [inputNames, setInputNames] = useState([])

  useEffect(() => {
    // console.log('USE EFFECT:', inputNames)
  }, [inputNames])

  // AFTER SERVER SUCCESS!
  function HandleSuccess(newInput) {
    try {
      const { data, input } = newInput
      setInputNames((oldInputs) => [...oldInputs, input.username])
      console.log('HANDLE SUCCESS', data)
    } catch (error) {
      console.error('HandleSuccess Function: ', error)
    }

    // revalidatePath('/Dashboard/meals/breakfast')
    // console.log('HANDLE SUCCESS:', data, input)
  }

  // Calling Server Actions!
  const { execute, isPending, status, result } = useAction(TESTERDB, {
    onSuccess(data) {
      HandleSuccess(data)
      setIsLoading(false)
      console.log('Finished...:', data)
    },
    onExecute(input) {
      console.log('Executing...:', input)
      setIsLoading(true)
    },
    onError(result) {
      console.error(result?.error?.serverError)
      console.error(result?.error?.validationErrors)
    },
  })

  // Client side Validation!
  const form = useForm({
    resolver: zodResolver(TESTERSCHEMA),
    defaultValues: {
      username: '',
      userId: userId,
    },
  })

  function onSubmit(values) {
    if (!values) {
      console.error('ERROR onSubmit!')
    }

    console.log('ON SUBMIT', values)

    execute(values)
    // setResultMessage(true)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-12 mt-24 justify-center items-center '>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='TESTER' type={'text'} className='text-center ' {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>{isLoading ? <Loading /> : 'Submit'}</Button>
        </form>
      </Form>
      {/* <div>{resultMessage && { notifyMessage }}</div> */}
      {inputNames.length > 0 && (
        <div className='w-1/2 h-fit bg-black text-2xl flex flex-col justify-center items-center gap-4'>
          {inputNames.map((name, index) => (
            <div key={index}> {name} </div>
          ))}
        </div>
      )}
    </>
  )
}

export default TESTER
