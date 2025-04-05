import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const NoPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar /> 
    <div className="flex-grow flex items-center justify-center w-full h-full ">
        <img src="../src/assets/notfound.jpg" alt="" className='w-[50%]' />
    </div>
</div>
  )
}

export default NoPage