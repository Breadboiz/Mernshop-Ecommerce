import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Slider from '../../components/Slider'
import Collections from '../../components/Collections'
import PopularProduct from '../../components/PopularProduct'

const HomePage = () => {

  return (
    <div className='flex flex-col flex-grow w-full  min-h-screen absolute scroll-smooth'>
        <Navbar />
          <Slider/>
          <Collections/>
          <PopularProduct/>
        <Footer />
    </div>
  )
}

export default HomePage