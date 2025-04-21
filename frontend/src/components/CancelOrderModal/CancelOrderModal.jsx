import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../lib/axios';

const CancelOrderModal = ({ orderID, onClose, userID }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCancel = async () => {
    if (!reason.trim()) {
      return toast.error('Vui lòng nhập lý do hủy đơn!');
    }

    setLoading(true);
    try {
      await axiosInstance.post(`/order/cancel/${orderID}`, {
        reason,
      }, {
        headers: { 'x-client-id': userID },
        withCredentials: true,
      });

      toast.success('Đã hủy đơn hàng thành công');
      onClose();
      setTimeout(() => {
        window.location.reload(); // ✅ refresh lại trang
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error('Hủy đơn hàng thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] sm:w-[400px] max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Lý do hủy đơn</h2>
        <textarea
          ref={textareaRef}
          className="w-full h-32 border-2 border-gray-300 rounded-lg p-4 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          rows={4}
          placeholder="Nhập lý do hủy đơn..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Đóng
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className={`px-6 py-2 text-sm rounded-lg transition duration-200 ${
              loading
                ? 'bg-red-300 cursor-not-allowed text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {loading ? 'Đang xử lý...' : 'Xác nhận hủy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
