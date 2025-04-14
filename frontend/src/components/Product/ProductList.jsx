import React from 'react'
import Product from './Product'
import { Outlet } from 'react-router-dom'

const ProductList = ({products}) => {
  return ( 
    <div className='w-full sm:w-[80%] h-auto py-15'>
        <h2 className='text-2xl font-semibold mb-5  px-2 sm:px-10'>Danh sách sản phẩm</h2>
        <div className=' p-2 sm:p-10 grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-12'>
        {
          products.map((product) => (
            <Product key={product._id} product={product}/>
          ))
        }
        
        
        </div>
        <Outlet/>
    </div>
  )
}

export default ProductList