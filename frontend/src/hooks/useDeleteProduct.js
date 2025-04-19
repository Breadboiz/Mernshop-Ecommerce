import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);

  const deleteProduct = async (id, cb) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const clientId = user._id;

      const res = await axiosInstance.delete(`products/deleteProduct/${id}`, {
        headers: {
          'x-client-id': clientId,
        },
        withCredentials:true

      });

      toast.success(res.data.message);
      if (cb) cb(); // callback sau khi xóa thành công
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Lỗi khi xoá sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading };
};

export default useDeleteProduct;