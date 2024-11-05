import Footer from '@/components/core/Footer'
import Navbar from '@/components/core/Navbar'
import LoginForm from './Components/LogIn'

async function page() {
  return (
    <main className='flex flex-col justify-center h-screen bg-backgroundDarker'>
      <Navbar />
      <LoginForm />
      <Footer />
    </main>
  )
}

export default page
