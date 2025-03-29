'use client'

// FORM VALIDATION & HANDLING
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'

// SHADCN FORM COMPONENTS
import { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '../../../globalComponents/shadcn/form'
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from '../../../globalComponents/shadcn/select'
import { RadioGroup, RadioGroupItem } from '../../../globalComponents/shadcn/radio-group'
import { Button } from '../../../globalComponents/shadcn/button'
import { Input } from '../../../globalComponents/shadcn/input'
import { Textarea } from '../../../globalComponents/shadcn/textarea'

// FORM INPUT COMPONENTS
import { DirectImageInput } from './forms/DirectImageInput'
import { NameInput } from './forms/NameInput'

// Other Components
import CategoryLinks from './CategoryLinks'

// DB ACTIONS & FORM SCHEMAS
import { TESTERSCHEMA } from '../schemas/TESTERSCHEMA'
import { TESTERDB } from '../server/db/mealBankActions'

// UI FEEDBACK
import Loading from '../../../app/Loading'
import { toast } from 'react-toastify'

import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import ImageUploadIcon from './ImageUploadIcon'
import { setTimeout } from 'timers'

function TESTER({ sessionData }) {
  // ----------------------- USER DATA  ----------------------- //
  const { session, user } = sessionData
  const userId = user.id

  // ----------------------- UI CONDITIONALS ----------------------- //
  const [resultMessage, setResultMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // ----------------------- UI FEEDBACK ----------------------- //
  const notifyMessage = () => toast(resultMessage)
  const mealCategories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']

  // ----------------------- IMAGE STATES / UI HANDLING ----------------------- //
  const [imageFullscreen, setImageFullscreen] = useState(false)
  const [imageInput, setImageInput] = useState(null)
  const validImage = TESTERSCHEMA.safeParse(imageInput)

  // ----------------------- IMAGE FUNCTIONS ----------------------- //
  // ----- SET NEW IMAGE  ----- //
  const handleNewImage = (file) => {
    // if (imageInput) {
    //   URL.revokeObjectURL(imageInput)
    // }
    const previewURL = URL.createObjectURL(file)
    setImageInput(previewURL)
  }
  // ----- REMOVE IMAGE  ----- //
  const removeCurrentImage = () => {
    setImageInput(null)
    URL.revokeObjectURL(imageInput)
    // if (imageInput?.previewURL) {
    //   setImageInput(null)
    // }
    // if (imageInput === null) {
    //   const url = imageInput.previewURL
    //   setTimeout(() => {
    //     URL.revokeObjectURL(url)
    //   }, 0)
    // }
  }

  // ----------------------- AFTER SERVER SUCCESS ----------------------- //
  function HandleSuccess(userInput) {
    const { data, input } = userInput
    // console.log('HANDLE SUCCESS DATA:', input)
    // console.log('HANDLE SUCCESS INPUT:', input)
    console.log('HANDLE SUCCESS:', '\nCategory:', input.category, '\nRating:', input.rating, '\nname:', input.name, '\nUserID:', input.userId)

    // revalidatePath('/Dashboard/meals/breakfast')
  }

  // CALLING SERVER ACTIONS!
  const { execute, isPending, status, result } = useAction(TESTERDB, {
    onSuccess(data) {
      HandleSuccess(data)
      setIsLoading(false)
      // console.log('onSuccess: Finished...:')
    },
    onExecute(input) {
      // console.log('onExecute: Executing...:')
      setIsLoading(true)
    },
    onError(result) {
      console.error(result?.error?.serverError)
      console.error(result?.error?.validationErrors)
    },
  })

  // CLIENT SIDE VALIDATION!
  const form = useForm({
    resolver: zodResolver(TESTERSCHEMA),
    defaultValues: {
      name: '',
      category: '',
      rating: null,
      image: null,
      userId: userId,
    },
  })

  // ON BUTTON SUBMIT =>
  function onSubmit(values) {
    try {
      if (values) {
        console.log('ON SUBMIT', values)
        execute(values)
        // setResultMessage(true)
      }
    } catch (e) {
      console.error('Error', e)
      console.error('ERROR onSubmit!')
    }
  }

  return (
    <div className='flex flex-col gap-12'>
      <h1 className={`font-lobster mt-12 text-5xl text-center md:text-8xl lg:text-8xl`}>Meal Bank</h1>
      {/* <div className='flex flex-wrap'> */}
      <CategoryLinks />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-wrap gap-12 mt-24 justify-center  '>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Meal Name <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <NameInput placeholder='TESTER' type={'text'} className='text-center ' {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Meal Category <span className='text-red-500'>*</span>{' '}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Choose a Category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mealCategories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>{/* Manage categories in your <Link href='#'>Settings</Link> */}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Rating <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value}>
                    <div className={`flex flex-wrap justify-center items-center space-x-3`}>
                      {/* 1 STAR RATING */}
                      <div className={`star-container ${field.value >= 1 ? 'active' : ''} flex flex-col items-center   `}>
                        <RadioGroupItem value={1} id='rating-1' />
                        <label title='1 star' htmlFor='rating-1' className='star-label'>
                          <svg className='star-svg' xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 576 512'>
                            <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                          </svg>
                        </label>
                      </div>

                      {/* 2 STAR RATING */}
                      <div className={`star-container ${field.value >= 2 ? 'active' : ''} flex flex-col  items-center`}>
                        <RadioGroupItem value={2} id='rating-2' />
                        <label title='2 stars' htmlFor='rating-2' className='star-label'>
                          <svg className='star-svg' xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 576 512'>
                            <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                          </svg>
                        </label>
                      </div>

                      {/* 3 STAR RATING */}
                      <div className={`star-container ${field.value >= 3 ? 'active' : ''} flex flex-col items-center`}>
                        <RadioGroupItem value={3} id='rating-3' />
                        <label title='3 stars' htmlFor='rating-3' className='star-label'>
                          <svg className='star-svg' xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 576 512'>
                            <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                          </svg>
                        </label>
                      </div>

                      {/* 4 STAR RATING */}
                      <div className={`star-container ${field.value >= 4 ? 'active' : ''} flex flex-col items-center`}>
                        <RadioGroupItem value={4} id='rating-4' />
                        <label title='4 stars' htmlFor='rating-4' className='star-label'>
                          <svg className='star-svg' xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 576 512'>
                            <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                          </svg>
                        </label>
                      </div>

                      {/* 5 STAR RATING */}
                      <div className={`star-container ${field.value >= 5 ? 'active' : ''} flex flex-col items-center`}>
                        <RadioGroupItem value={5} id='rating-5' />
                        <label title='5 stars' htmlFor='rating-5' className='star-label'>
                          <svg className='star-svg' xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 576 512'>
                            <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'></path>
                          </svg>
                        </label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
                <span>Current Rating: {field.value}</span>
              </FormItem>
            )}
          />

          <>
            {imageInput ? (
              <>
                <div className='relative'>
                  <div className={`bg-transparent border-0 p-0 m-0 h-full w-full cursor-zoom-in`} onClick={() => setImageFullscreen(true)}>
                    <Image src={imageInput} width={250} height={250} alt='Uploaded Image' className='border-2 border-border rounded-lg p-1' />
                  </div>
                  <Button className='absolute h-6 w-7 text-center rounded-xl top-0 -right-7 font-bold text-xs ' onClick={removeCurrentImage}>
                    X
                  </Button>
                </div>
                {imageFullscreen && (
                  <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center cursor-zoom-out' onClick={() => setImageFullscreen(false)}>
                    <Image className='' width={800} height={800} sizes='100vw' src={imageInput} />
                  </div>
                )}
              </>
            ) : (
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  // <FormItem className={`custum-file-upload ${field.value ? 'border-green-400' : ''} `}>
                  <FormItem className={`custum-file-upload ${imageInput ? 'border-green-400' : ''} `}>
                    <FormLabel>
                      <ImageUploadIcon />
                    </FormLabel>
                    <FormControl>
                      <DirectImageInput
                        {...field}
                        onChange={(file) => {
                          field.onChange(file)
                          handleNewImage(file)
                        }}
                        value={imageInput ? imageInput : undefined}
                        type={'file'}
                        accept={'image/*'}
                      />
                    </FormControl>
                    {/* <FormDescription>- Max image size (1MB)</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>

          <div className='flex justify-center w-full'>
            <Button className='' type='submit'>
              {isLoading ? <Loading /> : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
      {/* </div> */}
    </div>
  )
}

export default TESTER
