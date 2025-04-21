import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import axiosInstance from '../../lib/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import CancelOrderModal from '../../components/CancelOrderModal/CancelOrderModal';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const OrderDetails = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();
  const { orderID } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  console.log("order", order)
  const hanleConfirm = async () => {
    setLoading(true);
    try {
      console.log("id", authUser._id)
      const response = await axiosInstance.post(`/order/confirm/${orderID}`,{}, {
        headers: { 'x-client-id': authUser?._id },
        withCredentials: true,
      });
      if (response.data.metadata) {
        toast.success('Đơn hàng đã được xác nhận!');
        setOrder((prev) => ({ ...prev, order_status: 'completed' }));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // auto hide after 5s

      } else {
        toast.error('Xác nhận đơn hàng thất bại!');
      }
    } catch (error) {
      console.error("Confirm Order Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/order/detail/${orderID}`, {
          headers: { 'x-client-id': authUser._id },
          withCredentials: true,
        });
        const data = response.data.metadata;
        if (data) {
          setOrder(data);
        } else {
          toast.error('Không tìm thấy đơn hàng!');
        }
      } catch (error) {
        console.error("Fetch Order Error:", error.response?.data || error.message);
        toast.error('Lỗi khi tải thông tin đơn hàng!');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderID, authUser]);

  const orderStatusClasses = {
    pending: "text-yellow-500 font-semibold",
    cancelled: "text-red-500 font-semibold",
    completed: "text-green-600 font-semibold",
  };

  const getStatusClass = (status) => {
    return orderStatusClasses[status] || "text-gray-500";
  };


  return (
    <div className="flex flex-col min-h-screen">
      {showConfetti && <Confetti width={width - 100} height={height} />}
      {showCancelModal && (
        <CancelOrderModal
          orderID={order._id}
          userID={authUser._id}
          onClose={() => setShowCancelModal(false)}
          onSuccess={() => {
            // refetch nếu cần
          }}
        />
      )}
      <Navbar />
      {showCancelModal && (
        <CancelOrderModal
          orderID={order._id}
          userID={authUser._id}
          onClose={() => setShowCancelModal(false)}
          onSuccess={() => {
            // Optional: refetch data or update UI
          }}
        />
      )}

      <main className="flex-grow mt-8">
        <div className="max-w-5xl mx-auto px-4 border-b border-gray-200">
          <header className="flex justify-between flex-row border-b border-gray-200 pb-6">
            <h1 className="text-md sm:text-2xl font-semibold text-gray-600">🧾 Chi tiết đơn hàng</h1>
            <span
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
            >
              <FaArrowLeft className="text-sm sm:text-md" />
              <span className="text-sm sm:text-md text-gray-500">Quay lại</span>
            </span>
          </header>

          {/* Order details */}
          <div className="flex flex-col justify-between sm:flex-row mb-5 pt-5">
            <div className="flex flex-col gap-2 w-full sm:w-[50%] h-auto">
              <div className={`h-auto ${getStatusClass(order.order_status)}`}>
                Trạng thái: {order.order_status}
              </div>
              <div>
                <span className="mr-2 text-slate-400">Đơn hàng </span>
                <span className="text-slate-500 font-semibold">#{order._id}</span>
              </div>
              <div>
                <span className="mr-2 text-slate-400">Thời gian: </span>
                <span className="text-slate-500 font-semibold">
                  {new Date(order.createdAt).toLocaleString('vi-VN')}
                </span>
              </div>
              <div>
                <span className="mr-2 text-slate-400">Tổng tiền: </span>
                <span className="text-slate-500 font-semibold">
                  {order.order_checkout?.totalPrice}
                </span>
              </div>
              <div>
                <span className="mr-2 text-slate-400">Địa điểm: </span>
                <span className="text-slate-500 font-semibold">
                  {`${order.order_shipping?.street}, ${order.order_shipping?.ward}, ${order.order_shipping?.district}, ${order.order_shipping?.country}`}
                </span>
              </div>
              <div>
                <span className="mr-2 text-slate-400">Tên người nhận: </span>
                <span className="text-slate-500 font-semibold">{order.order_username}</span>
              </div>
              <div>
                <span className="mr-2 text-slate-400">SĐT: </span>
                <span className="text-slate-500 font-semibold">{order.order_phone}</span>
              </div>
              {
                 order.order_status === 'cancelled' && (
                  <div className='flex flex-col gap-2'>
                  <span className="mr-2 font-semibold text-red-400">Đơn hàng bị hủy bởi: {order.cancel_order.by}</span>
                  <span className="text-red-500 font-semibold">Lý do: {order.cancel_order.reason}</span>
                </div> 
                )
              }
            </div>
            
          {
            order.order_status === 'pending' && (
              <div className="flex flex-col gap-2 w-full sm:w-[20%] h-auto">
              {
                order.order_user_id === authUser?._id && <button className="btn btn-outline btn-success" onClick={hanleConfirm}>Hoàn tất đơn hàng</button>
              }
              {
              (order.order_user_id === authUser?._id || authUser?.role==='AD') && <button
               className="btn btn-outline btn-error"
               onClick={() => setShowCancelModal(true)}
             >
               Hủy đơn hàng
             </button>
             }
            </div>
            )
          }
          </div>


          {/* Order Products */}

          <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8 pt-5">
  {/* Danh sách sản phẩm */}
  <div className="flex flex-col gap-4 w-full sm:w-[60%]">
    <header className="border-b border-gray-300 pb-4">
      <h1 className="text-lg sm:text-2xl font-semibold text-gray-700">🧾 Sản phẩm</h1>
    </header>

    {!order?.order_products?.length ? (
      <p className="text-gray-500">Không có sản phẩm trong đơn hàng.</p>
    ) : (
      <div className="flex flex-col gap-4">
        {order.order_products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-4 gap-4"
          >
            {/* Thông tin sản phẩm */}
            <div className="flex items-center gap-4 w-full sm:w-2/3">
              <img
                src={product.product_thumbnail.url}
                alt={product.product_name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-sky-600">{product.product_name}</p>
                <p className="text-gray-600">Giá: {product.price.toLocaleString()}₫</p>
                <p className="text-gray-500">Số lượng: {product.quantity}</p>
              </div>
            </div>

            {/* Tổng giá */}
            <div className="text-right pt-3 w-full sm:w-1/3 font-semibold text-gray-800">
              Tổng: {(product.price * product.quantity).toLocaleString()}₫
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Tóm tắt đơn hàng */}
  <div className="bg-white rounded-xl shadow-md p-6 w-full sm:w-[35%] h-fit sticky top-20">
    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">Tóm tắt đơn hàng</h2>
    <div className="space-y-3 text-sm text-gray-600">
      <div className="flex justify-between">
        <span>Tạm tính</span>
        <span>{(order?.order_checkout?.totalPrice  
                - order?.order_checkout?.shippingFee  
                + order?.order_checkout?.totalApplyDiscount  ).toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>Phí vận chuyển</span>
        <span>{ (order?.order_checkout?.shippingFee || 0).toLocaleString() } đ</span>
      </div>
      <div className="flex justify-between">
        <span>Giảm giá</span>
        <span>{/* giá */}0₫</span>
      </div>
      <div className="border-t pt-3 flex justify-between font-semibold text-base text-gray-800">
        <span>Tổng cộng</span>
        <span>{(order?.order_checkout?.totalPrice || 0)} ₫</span>
      </div>
    </div>
  </div>
</div>


        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetails;


    /* Order Products
          {!order?.order_products?.length? (
              <p className="text-gray-500">Không có sản phẩm trong đơn hàng.</p>
            ) : (
              <div className="space-y-4">
                {order.order_products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-3"
                  >
                   
                    <div className='flex gap-2 items-center '>
                    <div className=''>
                      <img src={product.product_thumbnail.url} alt="" className="w-16 h-16 object-cover" />
                    </div>
                      <p className="font-medium">{product.product_name}</p>
                      <p className="text-sm text-gray-500">Số lượng: {product.quantity}</p>
                    </div>
                    <p className="text-right font-semibold">
                      {(product.price * product.quantity).toLocaleString()}₫
                    </p>
                  </div>
                ))}
              </div>
            )} */