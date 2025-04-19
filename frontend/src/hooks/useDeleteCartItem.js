import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

const useDeleteCartItem = () => {
  const [loading, setLoading] = useState(false);

  const deleteCartItem = async (id, cb) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userID = user._id;
        console.log(userID);
        const res = await axiosInstance.delete(`cart/`,{
        data: {
            userID: userID,
            productID: id
          },
        headers: {
          'x-client-id': userID,
        }, withCredentials: true
      });

      toast.success(res.data.message);
      if (cb) cb(); // callback sau khi xóa 
    } catch (err) {
        console.log(err);
      toast.error(err?.response?.data?.message || 'Lỗi khi xoá cart item');
    } finally {
      setLoading(false);
    }
  };

  return { deleteCartItem, loading };
};

export default useDeleteCartItem;