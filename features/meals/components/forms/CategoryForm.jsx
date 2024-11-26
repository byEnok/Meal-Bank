function CategoryForm(category) {
  const categoryValidation = {
    error: category.valueOf() === 'Select a category',
    success: category.valueOf() != 'Select a category',
  }
  return (
    <div>
      <select name='category' className={`${categoryValidation.error ? 'border-red-500' : categoryValidation.success ? 'border-green-500' : 'border'} border-2 border-border p-1 rounded-lg`}>
        <option value='Select a category'>Select a category</option>
        <option value='breakfast'>Breakfast</option>
        <option value='lunch'>Lunch</option>
        <option value='dinner'>Dinner</option>
        <option value='dessert'>Dessert</option>
      </select>
    </div>
  )
}

export default CategoryForm
