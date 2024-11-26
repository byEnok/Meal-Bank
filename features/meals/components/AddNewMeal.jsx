'use client'

import { links } from './CategoryLinks'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '../../../globalComponents/shadcn/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../globalComponents/shadcn/button'
import { useForm } from 'react-hook-form'
import { newMealSchema } from '../schemas/newMealSchema'
import { useAction } from 'next-safe-action/hooks'
import { CreateNewMeal } from '../server/db/mealBankActions'
import { revalidatePath } from 'next/cache'
import TimeToCook from './TimeToCookMeal'
import Loading from '../../../app/Loading'
import { toast } from 'react-toastify'
import Rating from '../../../globalComponents/core/Rating'
import ImageForm from '../../../globalComponents/core/ImageForm'

import CategoryForm from './forms/CategoryForm'

function AddNewMeal({ sessionData }) {
  const { user, session } = sessionData
  // console.log('AddNewMeal COMPONENT', user.id)
  const userID = user.id

  const [showMoreSettings, setShowMoreSettings] = useState(false)
  const [showNameError, setShowNameError] = useState(false)
  const [showCategoryError, setShowCategoryError] = useState(false)
  const [showRatingError, setShowRatingError] = useState(false)

  const [imageFullscreen, setImageFullscreen] = useState(false)
  const [imageInput, setImageInput] = useState(null)
  const validImage = newMealSchema.safeParse(imageInput)

  const handleFileChange = (file) => {
    setImageInput(file)
  }

  // console.error('Invalid Image:', validImage.error)
  // console.log('Valid Image: ', validImage.success)

  // CREATE NEW MEAL SERVER SIDE
  const { execute, status, result, isPending } = useAction(CreateNewMeal, {
    onSuccess(data) {
      if (data?.error) console.error(data.error)
      if (data?.success) console.log(data.success)
      isPending(false)
      toast('Meal Created! ✔')
    },
    // Automatically triggered with 'execute()' and receives the same values
    onExecute(input) {
      console.log('Creating Meal... input: ', input, '\nCreating Meal... Input.Content: ', input)
      isPending(true)
    },
    onError(result) {
      if (result?.error?.validationErrors) {
        console.error('Validation Error: ', result.error.validationErrors)
        setShowNameError(true)
      }
      if (result?.error?.serverError) {
        console.error('Server Error: ', result.error.serverError)
      }
      isPending(false)
    },
  })

  const form = useForm({
    resolver: zodResolver(newMealSchema),
    defaultValues: {
      name: '',
      rating: 0,
      image: null,
      comments: '',
      category: '',
      timeToCook: '',
      notes: '',
      instructions: '',
      ingredients: '',
      userID: userID,
    },
    mode: 'onChange',
  })

  // DISPLAYS ZOD ERROR MESSAGES!!!!!!
  // const name = form.getFieldState('name', form.formState)
  // const { errors } = form.formState
  // const zodErrorMessages = {
  //   name: errors.name?.message,
  //   rating: errors.rating?.message,
  //   category: errors.category?.message,
  // }

  // REAL TIME VALIDATION STYLING
  const mealName = form.watch('name')
  const category = form.watch('category')
  // const rating = form.watch('rating')

  const nameValidation = {
    error: mealName.length > 0 && mealName.length < 3,
    success: mealName.length >= 3,
  }

  // const ratingValidation = {
  //   error: rating.invalid,
  //   success: rating.length >= 3,
  // }

  // ON BUTTON SUBMIT - PASSES USER INPUT TO SERVER WITH 'EXECUTE(VALUES)'
  function onSubmit(values) {
    console.log('Working...', values)
    console.log('New Meal Info: ', values, 'Meal Name:', values.name, 'Rating: ', values.rating)
    // console.log('New Meal Info: ', values, 'Meal Name:', values.name, 'Rating: ', values.rating)
    // execute(values)
  }

  return (
    <div className='flex flex-col flex-wrap mt-5 items-center'>
      <h1 className={`font-lobster my-4 text-5xl text-center md:text-8xl lg:text-8xl`}>Meal Bank</h1>

      <div className={`hidden md:block relative z-50 w-full `}>
        <h2 className=' absolute z-40 md:left-64 pl-5'>{showMoreSettings ? 'Less Settings' : 'More Settings'}</h2>
        <Button className={` absolute md:left-96 rotate-180 }`} onClick={() => setShowMoreSettings(!showMoreSettings)}>
          <p className={` text-xl font-bold text-center py-1 transition-transform duration-500 ease-in-out ${showMoreSettings ? '-rotate-180' : ''}`}>^</p>
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-col gap-5 md:grid md:place-items-center md:grid-cols-3 ${showMoreSettings ? 'md:grid-rows-4' : 'md:grid-rows-3'} `}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Meal Name <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl className='flex self-center  border-border border-2 p-2 outline-none rounded-lg '>
                  <input type='text' placeholder='My favourite Pizza..' {...field} className={` max-w-[90%]  ${form.formState.isDirty && nameValidation.error ? 'border-red-500' : form.formState.isDirty && nameValidation.success ? 'border-green-500' : 'border'}`} />
                  {/* <input placeholder='My favourite Pizza..' {...field} className={`${mealName.error ? 'border-red-500' : 'border'}`} /> */}
                  {/* <input placeholder='My favourite Pizza..' {...field} className={`${name.error ? 'border-red-500' : name.success ? 'border-green-500' : 'border-border'}`} /> */}
                  {/* <input placeholder='My favourite Pizza..' {...field} className={`border ${form.formState.errors ? 'border-red-500' : 'border'}`} /> */}
                </FormControl>
                {/* <FormDescription>- Give your meal a name</FormDescription> */}
                {/* <div className='flex items-center justify-center gap-3'>
                  <div onClick={() => setShowNameError(!showNameError)} className='w-6 h-6 font-semibold border text-lg text-red-500 bg-transparent'>
                    !
                  </div>
                </div> */}
                {showNameError && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <CategoryForm {...field} category={category} />
                </FormControl>
                {/* <FormDescription>- Choose a category! </FormDescription> */}
                {/* <div className='flex items-center justify-center gap-3'>
                  <div onClick={() => setShowCategoryError(!showCategoryError)} className='w-6 h-6 font-semibold border text-lg text-red-500 bg-transparent'>
                    !
                  </div>
                </div> */}
                {showCategoryError && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Meal Rating <span className='text-red-500'>*</span>{' '}
                </FormLabel>
                <FormControl>
                  <Rating {...field} />
                </FormControl>
                {/* <FormDescription>- Rate the meal!</FormDescription> */}
                {/* <div className='flex items-center justify-center gap-3'>
                  <div onClick={() => setShowRatingError(!showRatingError)} className='w-6 h-6 font-semibold border text-lg text-red-500 bg-transparent'>
                    !
                  </div>
                </div> */}
                {showRatingError && <FormMessage />}
              </FormItem>
            )}
          />

          {showMoreSettings && (
            <>
              {imageInput ? (
                <>
                  <div className='relative'>
                    {/* <h3 className='text-2xl font-bold py-1 text-cener'>Image preview:</h3> */}
                    <div className={`bg-transparent border-0 p-0 m-0 h-full w-full cursor-zoom-in`} onClick={() => setImageFullscreen(true)}>
                      <Image src={URL.createObjectURL(imageInput)} width={250} height={250} alt='Uploaded Image' className='border-2 border-border rounded-lg p-1' />
                    </div>
                    <Button className='absolute h-7 w-7  top-0 -left-8 font-semibold text-md ' onClick={() => setImageInput(false)}>
                      X
                    </Button>
                  </div>

                  {imageFullscreen && (
                    <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center cursor-zoom-out' onClick={() => setImageFullscreen(false)}>
                      <Image className='' width={800} height={800} sizes='100vw' src={URL.createObjectURL(imageInput)} />
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                      <FormItem className='custum-file-upload text-center'>
                        {/* <FormLabel></FormLabel> */}
                        <FormControl>
                          <ImageForm {...field} onFileChange={handleFileChange} />
                          {/* <input type='file' accept='image/*' {...field} /> */}
                          {/* <input type='file' accept='image/*' onChange={(e) => field.onChange(e.target.files[0])} /> */}
                        </FormControl>
                        <FormDescription>- Max image size (1MB)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name='timeToCook'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time to make</FormLabel>
                    <FormControl>
                      <TimeToCook {...field} />
                    </FormControl>
                    {/* <FormDescription>- Time to make the meal</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem expand={true}>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <textarea className={` `} placeholder='Additional notes...' {...field} />
                    </FormControl>
                    <FormDescription>- Extra information about the meal</FormDescription>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='instructions'
                render={({ field }) => (
                  <FormItem expand={true}>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <textarea placeholder='Cooking instructions...' {...field} />
                    </FormControl>
                    <FormDescription>- Detailed cooking instructions</FormDescription>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ingredients'
                render={({ field }) => (
                  <FormItem expand={true}>
                    <FormLabel>Ingredients</FormLabel>
                    <FormControl>
                      <textarea placeholder='Meal Ingredients' {...field} />
                    </FormControl>
                    <FormDescription>- Ingredients needed</FormDescription>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            </>
          )}
          {/* MORE SETTINGS BUTTON FOR SMALL SCREENS */}
          <div className={`flex  items-center flex-col gap-1 z-50 w-full pt-3 md:hidden `}>
            <h2 className='z-40 md:hidden'>{showMoreSettings ? 'Less Settings' : 'More Settings'}</h2>
            <div className={` rotate-180 }`} onClick={() => setShowMoreSettings(!showMoreSettings)}>
              <span className={` text-xl font-bold text-center py-1 transition-transform duration-500 ease-in-out ${showMoreSettings ? '-rotate-180' : ''}`}>^</span>
            </div>
          </div>

          {/* SUBMIT BUTTON*/}
          {/* <div className='flex justify-center w-full md:place-self-center md:col-span-full'> */}
          {/* <button disabled={isPending} type='submit' className={` h-9 w-16`}> */}
          <Button disabled={isPending} type='submit' className={` h-9 w-16 rounded-lg bg-backgroundDarker text-center border-2 border-border`}>
            {isPending ? <Loading /> : 'Add Meal'}
          </Button>
          {/* </div> */}
        </form>
      </Form>
    </div>
  )

  /* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post</FormLabel>
                <FormControl>
                  <input placeholder='Testing Testing' {...field} />
                </FormControl>
                <FormDescription>Is this Working?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Add Meal</Button>
        </form>
      </Form> */

  /* <main className='bg-red-400'> */
  /* <form action={() => SendMealData(formData)} className='flex justify-center items-center gap-5 border-b-8 pb-6 border-border'> */
  /* <div className='w-screen flex flex-wrap  gap-3 border-red-500'> */
  /* <div className='w-1/2'> */
  /* <label htmlFor='mealName'>Meal Name:</label> */
  /* <input name='mealName' type='text' className='addMealName  border-2 border-border p-1 rounded-lg text-center' placeholder='Legg til måltid...' /> */
  /* </div> */

  /* <div className='imageContainer flex flex-col justify-evenly items-center border-2 border-blue-500 border-dotted rounded-lg w-20 h-20  md:w-36 md:h-36 lg:w-60 '> */
  /* <div className='header flex flex-col items-center justify-center '> */
  /* <Image src='/icons/SVG/cloud-upload.svg' height={20} width={20} className='' /> */

  /* <label className='text-align  md:text-xl'>Select an Image!</label> */
  /* <input type='image' src='' alt='' /> */
  /* </div> */
  /* </div> */
  /* <button type='submit' className='h-10 w-10 border-2 rounded-lg'>
            Add
          </button> */
  /* </div> */
  /* SELECT CATEGORY */
  /* <div className=' w-full flex justify-center '> */
  /* <select name='categories' className='custom-select appearance-none flex justify-center items-center relative w-5/12 text-sm md:text-xl text-center border-2 border-border rounded-xl p-1 bg-backgroundDarker cursor-pointer '> */
  /* {mealCategories.map((option, index) => ( */
  /* <option value={option} key={index} className='category-options cursor-pointer focus:border-focusColor'> */
  /* {option} */
  /* </option> */
  /* ))} */
  /* </select> */
  /* </div> */
  /* </form> */
  /* </main> */
}

export default AddNewMeal
