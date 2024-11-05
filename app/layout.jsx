/** @type {import("next").Metadata} */
import './globals.css'
import './icons.css'
import { ThemeProvider } from '@/components/services/Theme-Provider'
import { Lobster, RobotoFont } from './fonts/fonts'
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
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={` antialiased ${RobotoFont.variable} ${Lobster.variable}`}>
        <ThemeProvider attribute='class' defaultTheme={'dark'} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
