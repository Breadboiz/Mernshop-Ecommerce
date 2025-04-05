import React from 'react'
const Product = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-auto bg-white p-2 border-b border-black px-2
    hover:translate-y-[-5px] hover:shadow-[5px_6px_6px_0px_rgba(0,_0,_0,_0.1)] duration-100
    '>
         <div className='mb-2'><img src="https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
         <div className='mb-2 text-md font-medium '>Mido</div>
         <div className='mb-2 text-sm text-gray-500 font-light text-justify'>Đồng hồ nam</div>
         <div className='mb-2 text-sm text-gray-500 font-light line-clamp-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae laudantium nobis sed sint culpa similique veritatis blanditiis temporibus, illo eum quasi praesentium expedita laborum rerum, quam, perferendis tempore perspiciatis commodi.</div>
         <div className='flex flex-col items-center justify-between'> 
            <div className='mb-2 text-sm text-red-500 font-semibold'>2000000VND</div>
            <button className="btn  btn-outline">Buy now</button>
            {/* <div className='mb-2 text-sm bg-gray-200 font-light line-through'>20% off </div> */}
         </div>
    </div>
  )}

export default Product
