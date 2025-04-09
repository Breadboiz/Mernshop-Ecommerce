import React, { useState, useEffect } from 'react'
import axiosInstance from '../../lib/axios';
import ProductItem from './ProductItem';
import { Outlet } from 'react-router-dom';
import useGetProductByFilter from '../../hooks/useGetProductByFilter';

const ManagementTab = () => {
  const {products,refesh,loading } = useGetProductByFilter(); 
  return (
    <div className='w-full sm:w-[80%] min-h-screen'>
        <Outlet  /> 
        <h2 className='text-2xl font-semibold mb-5  px-2 sm:px-10'>Danh sách sản phẩm</h2>
        <div className='flax flex-col  w-full h-auto bg-white p-2 '>
         
        <ul className="list bg-base-100 rounded-box shadow-md ">              
          
                {products.map((product, index) => (
                  <ProductItem key={index} product={product} cb = {refesh}/>
                ))}
              
             
      </ul>
        
        </div>
    </div>
  )
}

export default ManagementTab