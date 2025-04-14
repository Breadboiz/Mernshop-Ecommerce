import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import useGetOneProduct from '../../hooks/useGetOneProduct'
import DetailsPanel from '../../components/DetailsPanel.jsx/DetailsPanel'
import DetailsTab from '../../components/DetailsTab/DetailsTab'
import PopularProduct from '../../components/PopularProduct'

//import { authUser} from '../../context/AuthContext'; 
const ProductDetailsPage = () => {
  const {product, loading } = useGetOneProduct();
  if (loading || !product || !product.product_images) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Đang tải sản phẩm...</p>
      </div>
    );
  }
  console.log("product", product); //in ra 4 4 lần, 2 lần rỗng
  return (
    <div className='flex flex-col flex-grow w-full  min-h-screen absolute scroll-smooth'>
        <Navbar />
        {loading?<h1>Loading...</h1>:<DetailsPanel product={product}/>}
        <DetailsTab product={product}/>
        <PopularProduct/>
        <Footer />
    </div>
  )
}

export default ProductDetailsPage