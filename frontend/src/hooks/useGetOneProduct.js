import { use, useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import { useParams } from 'react-router-dom';

// Custom hook chỉ fetch dữ liệu
const useGetOneProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setloading] = useState(false);
  const {slug,id} = useParams();
  const params = slug || id
    const fetchProducts = async () => {
    setloading(true);
    try {
      const response = await axiosInstance.get(`/products/product/${params}`);
      console.log(response.data.metadata);
      setProduct(response.data.metadata); 
    } catch (error) {
      console.error("Lỗi khi tìm sản phẩm:", error);
    }finally{
      setloading(false);
    }
  };
  
  useEffect(() => { 
    fetchProducts(); 
}, [] )
return  {loading, product}
};

export default useGetOneProduct;
