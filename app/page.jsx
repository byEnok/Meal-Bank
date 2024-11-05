import Footer from '@/components/core/Footer'
import HomePage from '@/components/core/HomePage'
import Navbar from '@/components/core/Navbar'

export default function Home() {
  return (
    <div className='flex flex-col justify-evenly bg-background h-screen overflow-x-hidden'>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  )
}
