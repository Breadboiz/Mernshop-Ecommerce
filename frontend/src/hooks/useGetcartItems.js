import { use, useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';

// Custom hook chỉ fetch dữ liệu
const useGetcartItemsList = () => {
  const [cartItemsList, setCartItemsList] = useState([]);
  const [loading, setloading] = useState(false);

    const fetchCartItemsList = async () => {
    setloading(true);
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userID = user._id;
      const response = await axiosInstance.get('/cart',  {
        headers: {
          'x-client-id': userID
        },
        withCredentials: true
      });
      setCartItemsList(response.data.metadata); 
    } catch (error) {
      console.error("Lỗi khi tìm sản phẩm:", error);
    }finally{
      setloading(false);
    }
  };
  
  

  useEffect(() => { 
    fetchCartItemsList(); 
}, [] )
return  {cartItemsList,loading, refresh : fetchCartItemsList}
};

export default useGetcartItemsList;
