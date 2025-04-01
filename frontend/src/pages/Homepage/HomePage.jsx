import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const HomePage = () => {
  return (
    <div className='flex flex-col flex-grow w-full h-full absolute'>
        <Navbar />
        <Footer />
    </div>
  )
}

export default HomePage