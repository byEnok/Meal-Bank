import React from 'react'
import Navbar from '@/components/core/Navbar'
import AddNewMeal from '../components/AddNewMeal'
import ShowMeal from '../components/ShowMeal'
import CategoryLinks from '../components/CategoryLinks'
import Footer from '@/components/core/Footer'

function page() {
  return (
    <div className='flex flex-col h-screen gap-12  '>
      <Navbar />
      <AddNewMeal />
      <CategoryLinks />
      <ShowMeal />
      <Footer />
    </div>
  )
}

export default page
