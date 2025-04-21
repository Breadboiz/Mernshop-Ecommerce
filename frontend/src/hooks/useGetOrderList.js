import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import { useAuthContext } from '../context/AuthContext';

const useGetOrderList = ({ initialPage = 1, initialLimit = 10, statusFilter = 'all' } = {}) => {
  const { authUser } = useAuthContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);
  const [currentStatus, setCurrentStatus] = useState(statusFilter);

  const fetchOrders = async () => {
    if (!authUser?._id) return;
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({ page, limit });
      if (currentStatus !== 'all') queryParams.append('status', currentStatus);

      const response = await axiosInstance.get(`/order?${queryParams.toString()}`, {
        headers: { 'x-client-id': authUser._id },
        withCredentials: true,
      });

      const { orders = [], pagination = {} } = response.data.metadata || {};
      setOrders(orders);
      setTotalPages(pagination.totalPages || 1);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [authUser, page, currentStatus]);

  return {
    orders,
    loading,
    page,
    totalPages,
    currentStatus,
    setPage,
    setStatusFilter: (status) => {
      setPage(1);
      setCurrentStatus(status);
    },
    refresh: fetchOrders,
  };
};

export default useGetOrderList;
