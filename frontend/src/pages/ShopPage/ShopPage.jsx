import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Filter from '../../components/Filter'
import ProductList from '../../components/Product/ProductList'

const ShopPage = () => {
  return (
    <div className='flex flex-col flex-grow w-full h-full absolute '>
        <Navbar />
        <div className='flex flex-col sm:flex-row w-full h-auto px-[2rem] lg:px-[6rem]'>
          <Filter/>
          <ProductList/>
        </div>
        <Footer />
    </div>
  )
}

export default ShopPage