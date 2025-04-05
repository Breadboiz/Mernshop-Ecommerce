import React from 'react'
import Product from './Product'

const ProductList = () => {
  return ( 
    <div className='w-full sm:w-[80%] h-auto py-15'>
        <h2 className='text-2xl font-semibold mb-5  px-2 sm:px-10'>Danh sách sản phẩm</h2>
        <div className=' p-2 sm:p-10 grid grid-cols-1 sm:grid-cols-4 gap-x-4 gap-y-12'>
        <Product />
        {/* <Product />
        <Product />
        <Product />
        <Product />
        <Product /> */}
        </div>
    </div>
  )
}

export default ProductList