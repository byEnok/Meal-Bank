import Link from 'next/link'
import { authClient } from '../../lib/authClient'
import CategoryLinks from '@/features/meals/components/CategoryLinks'

function page() {
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']

  // useEffect(() => {}, [])

  return (
    <>
      <CategoryLinks />
      {/* <div className='flex flex-wrap justify-center items-center gap-12 md:text-2xl bg-red-400 '>
        {categories.map((category, index) => (
          <Link className='border-2 border-border p-1 rounded-xl' key={index} href={`Dashboard/meals/${category.toLowerCase()}`}>
            {category}
          </Link>
        ))}
      </div> */}
    </>
  )
}

export default page
