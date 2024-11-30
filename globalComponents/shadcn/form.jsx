'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Controller, FormProvider, useFormContext } from 'react-hook-form'

import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Label } from '@/globalComponents/shadcn/label'

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ className, expand = false, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn(`flex flex-col ${expand ? 'flex-1' : ' max-w-56'} items-center min-w-52 min-h-52 justify-evenly border-2 border-border rounded-lg p-2  focus-within:border-focusColor `, className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return <Label ref={ref} className={cn('text-xl md:text-2xl text-center', className)} htmlFor={formItemId} {...props} />
  // return <Label ref={ref} className={cn(error ? 'text-destructive text-xl md:text-3xl' : 'text-xl md:text-3xl text-center', className)} htmlFor={formItemId} {...props} />
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { theme } = useTheme()
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      className={`border-2 border-border p-2 rounded-lg outline-none ${theme === 'dark' ? 'placeholder:text-white ' : 'placeholder-white'}  `}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { theme } = useTheme()
  const { formDescriptionId } = useFormField()

  return <p ref={ref} id={formDescriptionId} className={cn(`text-sm  ${theme === 'dark' ? 'placeholder:text-slate-400' : 'placeholder:text-slate-900'} `, className)} {...props} />
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p ref={ref} id={formMessageId} className={cn('text-sm font-medium text-destructive', className)} {...props}>
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField }
