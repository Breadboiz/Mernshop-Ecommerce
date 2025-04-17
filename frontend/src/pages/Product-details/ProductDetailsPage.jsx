import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import useGetOneProduct from '../../hooks/useGetOneProduct'
import DetailsPanel from '../../components/DetailsPanel.jsx/DetailsPanel'
import DetailsTab from '../../components/DetailsTab/DetailsTab'
import PopularProduct from '../../components/PopularProduct'
import { useAuthContext } from '../../context/AuthContext';
//import { authUser} from '../../context/AuthContext'; 
const ProductDetailsPage = () => {
  const { authUser } = useAuthContext();
  const {product, loading } = useGetOneProduct();
  if (loading || !product || !product.product_images) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Đang tải sản phẩm...</p>
      </div>
    );
  }
  return (
    <div className='flex flex-col flex-grow w-full  min-h-screen absolute scroll-smooth'>
        <Navbar />
        {loading?<h1>Loading...</h1>:<DetailsPanel product={product} user={authUser}/>}
        <DetailsTab product={product} />
        <PopularProduct/>
        <Footer />
    </div>
  )
}

export default ProductDetailsPage