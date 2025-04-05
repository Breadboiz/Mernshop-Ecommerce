import React from 'react'
import { Link } from 'react-router-dom'
const Filter = () => {
  return (
    <div className='flex flex-col w-full sm:w-[20%] h-auto  p-2 sm:p-5 items-center'>
        <div className='flex flex-col w-full h-full  py-10'>
          <h2 className='text-xl mb-5'>Categories</h2>
          <p className='flex justify-between mb-3 border-b border-gray-200 hover:text-orange-500 hover:font-semibold'><Link to={'/shop'}>Tất cả</Link> <span>({100})</span></p>
          <p className='flex justify-between mb-3 border-b border-gray-200 hover:text-orange-500 hover:font-semibold'><Link to={'/shop?type=men'}>Đồng hồ nam</Link> <span>({100})</span></p>
          <p className='flex justify-between mb-3 border-b border-gray-200 hover:text-orange-500 hover:font-semibold'><Link to={'/shop?type=women'}>Đồng hồ nữ</Link> <span>({100})</span></p>
          <p className='flex justify-between mb-3 border-b border-gray-200 hover:text-orange-500 hover:font-semibold'><Link to={'/shop?type=doublewatch'}>Đồng hồ đôi</Link> <span>({100})</span></p>
        </div> 
    </div>
)}

export default Filter