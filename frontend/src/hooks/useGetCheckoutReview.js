import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

// Custom hook chỉ fetch dữ liệu
const useGetCheckoutReview = (cartID) => {
  const [checkoutReview, setCheckoutReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCheckoutReview = async () => {
    console.log("Ca",cartID);
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userID = user._id;

      const response = await axiosInstance.get('/checkout', {
        params: {
          cartID,
        },
        headers: {
          'x-client-id': userID,
        },
        withCredentials: true,
      });
      setCheckoutReview(response.data.metadata);
    }  finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (cartID) getCheckoutReview();
  }, [cartID]);

  return { checkoutReview, loading, getCheckoutReview };
};

export default useGetCheckoutReview;
