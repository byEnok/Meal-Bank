'use client'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <div className='footer fixed bottom-0 w-screen flex justify-center text-center border-t-2 border-border p-4'>
      <a id='emailFooter' className='text-lg underline' href='mailto:enoksenn@gmail.com'>
        enoksenn@gmail.com
      </a>
    </div>
  )
}

export default Footer
