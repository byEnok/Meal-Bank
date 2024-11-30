import * as React from 'react'
import { cn } from '@/lib/utils'

const DirectImageInput = React.forwardRef(({ className, type, onChange, ...props }, ref) => {
  return (
    <input
      type={type}
      onChange={(e) => {
        const file = e.target.files[0]
        // console.log('input:', file)
        if (onChange) {
          onChange(file)
        }
      }}
      className={cn('flex flex-col w-full cursor-pointer disabled:cursor-not-allowed ', className)}
      ref={ref}
      {...props}
    />
  )
})
DirectImageInput.displayName = 'DirectImageInput'

export { DirectImageInput }
