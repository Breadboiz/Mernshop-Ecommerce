import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import axiosInstance from '../../lib/axios';
import OrderItem from '../OrderManagementTab/OrderItem';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const UserOrder = () => {
  const { authUser } = useAuthContext();
  const [orderItemsList, setOrderItemsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrderItemsList = async () => {
    setLoading(true);
    try {
      const userID = authUser._id;
      const query = `/order/user/${userID}?page=${page}&limit=${limit}${statusFilter !== 'all' ? `&status=${statusFilter}` : ''}`;

      const response = await axiosInstance.get(query, {
        headers: {
          'x-client-id': userID
        },
        withCredentials: true
      });

      const { orders = [], pagination = {} } = response.data.metadata || {};
      setOrderItemsList(orders);
      setTotalPages(pagination.totalPages || 1);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const statuses = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xử lý", value: "pending" },
    { label: "Đã hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
  ];

  useEffect(() => {
    if (!authUser?._id) return;
    fetchOrderItemsList();
  }, [page, statusFilter, authUser]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setPage(1); // reset về trang 1 khi lọc
  };

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-5'>Danh sách đơn hàng</h1>
      <div className="flex gap-2 px-4 sm:px-10 mb-8">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className={`px-4 py-2 rounded-full border text-sm transition
              ${statusFilter === status.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
          >
            {status.label}
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col gap-y-2 px-4 sm:px-10">
        {loading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : orderItemsList.length === 0 ? (
          <p className="text-gray-500 text-center">Không có đơn hàng nào.</p>
        ) : (
          orderItemsList.map((item, index) => (
            <OrderItem key={index} order={item} index={index} />
          ))
        )}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <FaArrowLeft className='text-lg' />
          </button>
          <span className="px-2 py-2">Trang {page} / {totalPages}</span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <FaArrowRight className='text-lg' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
