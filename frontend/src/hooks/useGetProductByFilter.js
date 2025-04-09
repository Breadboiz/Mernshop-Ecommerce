import { use, useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import { useSearchParams } from 'react-router-dom';

// Custom hook chỉ fetch dữ liệu
const useGetProductByFilter = () => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = {}
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }
  const search =  searchParams.get('search') || ""
  const offset = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 20
  const {search: _search, offset: _offset, ...filterQuery} = query
 
     const fetchProducts = async () => {
    setloading(true);
    try {
      const response = await axiosInstance.get('/products', {
        params: {
          search,
          filter: filterQuery,
          offset ,
          limit
        },
      });
      setProducts(response.data.metadata.products); 
    } catch (error) {
      console.error("Lỗi khi tìm sản phẩm:", error);
    }finally{
      setloading(false);
    }
  };
  
  

  useEffect(() => { 
    fetchProducts(); 
}, [searchParams] )
return  {loading, products, refesh: fetchProducts}
};

export default useGetProductByFilter;
