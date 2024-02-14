import React from 'react'
import Container from '../container/Container'

function AddProductsForm() {
  return (
    <Container>
        <form className='flex flex-col gap-2'>
            <input  type="text" placeholder='product name'/>
            <textarea type="text" placeholder='product description'/>
            <input  type="text" placeholder='featuredImage'/>
            <input  type="text" placeholder='images array'/>
            <input  type="number" placeholder='price'/>
            <input  type="number" placeholder='discount'/>
            <input  type="checkbox" id='inStock'/>
            <label  htmlFor="inStock">In Stock</label>
            <input  type="text" placeholder='slug'/>

        </form>
    </Container>
  )
}

export default AddProductsForm