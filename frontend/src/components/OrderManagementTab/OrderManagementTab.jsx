import React from 'react';
import useGetOrderList from '../../hooks/useGetOrderList';
import OrderItem from './OrderItem';

const OrderManagementTab = () => {
  const {
    orders,
    loading,
    page,
    totalPages,
    setPage,
    currentStatus,
    setStatusFilter,
  } = useGetOrderList();

  const statuses = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Chờ xử lý', value: 'pending' },
    { label: 'Đã hoàn thành', value: 'completed' },
    { label: 'Đã hủy', value: 'cancelled' },
  ];

  return (
    <div className="w-full sm:w-[80%] h-auto mx-auto shadow-md pb-5 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-5 px-4 sm:px-10">Danh sách đơn hàng</h2>

      {/* Bộ lọc trạng thái */}
      <div className="flex gap-2 px-4 sm:px-10 mb-8">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => setStatusFilter(status.value)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              currentStatus === status.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col gap-y-2 px-4 sm:px-10">
        {loading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center">Không có đơn hàng nào.</p>
        ) : (
          orders.map((order, index) => <OrderItem key={index} order={order} index={index} />)
        )}

        {/* Phân trang */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Trang trước
          </button>
          <span className="px-2 py-2">Trang {page} / {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementTab;
