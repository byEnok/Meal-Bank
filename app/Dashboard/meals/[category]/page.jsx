'use server'
// import { GetMeals } from '@/features/meals/server/db/mealBankActions'
import AddNewMeal from '../../../../features/meals/components/AddNewMeal'
import TESTER from '../../../../features/meals/components/TESTER'
// import ShowMeal from '@/features/meals/components/ShowMeal'
// import CategoryLinks from '@/features/meals/components/CategoryLinks'
import { userData, UserSession } from '../../../../features/users/server/db/userActions'

async function page() {
  const sessionData = await UserSession()
  // console.log('PAGE COMPONENT | ON THE SERVER |', user)

  // if (!data) {
  //   console.log('Could not get userData. Error:', data)
  // } else {
  //   console.log('UserData fetching successfull')
  // }

  // const data = GetMeals()
  // console.log('FETCHED DATA: ', data.users)
  // const meals = data.users
  // const userInfo = [meals.image, meals.username, meals.height, meals.eyeColor]
  // console.log('meals PAGE: ', meals)

  return (
    <div className='flex flex-col'>
      {/* <AddNewMeal sessionData={sessionData} /> */}
      <TESTER sessionData={sessionData} />

      {/* <CategoryLinks {...meals[0].address} />
      {meals.map((meal, index) => (
        <ShowMeal {...meal} key={index} />
      ))} */}
    </div>
  )
}

export default page
