import Ract from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

const ShopPage = () => {
  return (
    <div className='flex flex-col flex-grow w-full h-full absolute'>
        <Navbar />
          <h1>Shop</h1>
        <Footer />
    </div>
  )
}

export default ShopPage