import Footer from '@/components/core/Footer'
import Navbar from '@/components/core/Navbar'
import CreateUser from './components/CreateUser'

function page() {
  return (
    <div className='flex flex-col justify-center h-screen bg-backgroundDarker '>
      <Navbar />
      {/* <div className='flex flex-col flex-grow justify-center items-center'> */}
      <CreateUser />
      {/* </div> */}
      <Footer />
    </div>
  )
}

export default page
