function TimeToCookMeal() {
  return (
    <div className='flex  justify-center items-center '>
      <div className='flex flex-col items-center border-border rounded-lg p-1.5'>
        {/* <label className='p-1 text-xl font-semibold'>Minutes</label> */}
        <select className='text-center p-1 border rounded-lg'>
          <option value='0'>0 min</option>
          <option value='5'>5 min</option>
          <option value='10'>10 min</option>
          <option value='15'>15 min</option>
          <option value='20'>20 min</option>
          <option value='25'>25 min</option>
          <option value='30'>30 min</option>
          <option value='35'>35 min</option>
          <option value='40'>40 min</option>
          <option value='45'>45 min</option>
          <option value='50'>50 min</option>
          <option value='55'>55 min</option>
        </select>
      </div>
      <div className='flex flex-col items-center border-border rounded-lg p-1.5'>
        {/* <label className='p-1 text-xl font-semibold'>Hours</label> */}
        <select className='text-center p-1 border rounded-lg'>
          <option value='0'>0 hours</option>
          <option value='1'>1 hour</option>
          <option value='2'>2 hours</option>
          <option value='3'>3 hours</option>
          <option value='4'>4 hours</option>
          <option value='5'>5 hours</option>
          <option value='6'>6 hours</option>
          <option value='7'>7 hours</option>
          <option value='8'>8 hours</option>
          <option value='9'>9 hours</option>
          <option value='10'>10 hours</option>
        </select>
      </div>
    </div>
  )
}

export default TimeToCookMeal
