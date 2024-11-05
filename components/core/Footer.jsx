'use client'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <main className='mt-auto border-border border-t-2 p-5 bg-backgroundDarker'>
      <div className='footer flex justify-center items-center  p-2 gap-2 '>
        {/* mt-auto */}
        {/* <Link href="#" className="footer flex flex-col justify-center items-center bg-login-page-bg min-h-full"> */}
        {/* <h1 className="text-xl">contact@gmail.com</h1> */}
        <a id='emailFooter' className='text-lg underline' href='mailto:enoksenn@gmail.com'>
          enoksenn@gmail.com
        </a>
        {/* <h2 className="text-xs">Created by Simon Enoksen</h2> */}
        {/* </Link> */}
        {/* <Image src="#" alt=""/> */}
      </div>
    </main>
  )
}

export default Footer
