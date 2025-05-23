import React from 'react'
import { Link, useNavigate } from "react-router-dom";
const Product = ({product}) => {
  const navigate = useNavigate()
  return (
   <div>
  
       <div className='flex flex-col items-center justify-center w-full h-auto bg-white p-2 border-b border-black px-2
       hover:translate-y-[-5px] hover:shadow-[5px_6px_6px_0px_rgba(0,_0,_0,_0.1)] duration-100
       '>
            <div className='mb-2'><img src={product.product_thumbnail.url} onClick={() => navigate(`/shop/${product.slug}`)} alt="" className='cursor-pointer' /></div>
            <div className='mb-2 text-md font-medium line-clamp-1 hover:line-clamp-2 cursor-pointer' onClick={() => navigate(`/shop/${product.slug}`)}>{product.product_name}</div>
            <div className='mb-2 text-sm text-gray-500 font-light text-justify'>{product.product_category}</div>
            <div className='mb-2 text-sm text-gray-500 font-light line-clamp-2'>
                {product.description}
            </div>
            <div className='flex flex-col items-center justify-between'> 
               <div className='mb-2 text-sm text-red-500 font-semibold'>{(product.product_price).toLocaleString('vi-VN')}VND</div>
               <button className="btn  btn-outline mb-5 cursor-pointer" onClick={() => navigate(`/shop/${product.slug}`)}>Buy now</button>
               {/* <div className='mb-2 text-sm bg-gray-200 font-light line-through'>20% off </div> */}
            </div>
       </div>

   </div>
  )}

export default Product
