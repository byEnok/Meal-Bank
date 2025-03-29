/** @type {import("next").Metadata} */
import './globals.css'
import './icons.css'
import Navbar from '../globalComponents/core/Navbar'
import Footer from '../globalComponents/core/Footer'
import { ThemeProvider } from '@/globalComponents/services/Theme-Provider'
import { Lobster, RobotoFont } from '@/fonts/fonts'
import { Bounce, ToastContainer } from 'react-toastify'
import { Suspense } from 'react'
import Loading from './Loading'
// import { UserSession } from '../features/users/server/db/userActions'
// import localFont from 'next/font/local'

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// })
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// })

export const metadata = {
  title: 'Meal Bank',
  description: 'Created by Simon Enoksen',
}

export default async function RootLayout({ children }) {
  // const sessionData = await UserSession()
  return (
    <html lang='en' className='!scroll-smooth overflow-x-hidden'>
      <body className={` antialiased ${RobotoFont.variable} ${Lobster.variable} min-h-screen flex flex-col`}>
        <ThemeProvider attribute='class' defaultTheme={'dark'} disableTransitionOnChange={true}>
          <Navbar />
          <Suspense fallback={<Loading />}>
            <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='dark' transition={Bounce} />
            {children}
          </Suspense>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
