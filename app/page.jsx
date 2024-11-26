import Footer from '@/globalComponents/core/Footer'
// import HomePage from '@/globalComponents/core/HomePage'
import HomePage from '../globalComponents/core/HomePage'

export default async function Home() {
  return (
    <div className='flex flex-col'>
      {/* <div className='flex-1 '> */}
      <HomePage />
      {/* </div> */}
      {/* <Footer /> */}
    </div>
  )
}
