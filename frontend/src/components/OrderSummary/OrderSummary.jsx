import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext.jsx';
import toast from 'react-hot-toast';

const OrderSummary = ({ cartItemsList }) => {
  const { cartState } = useCartContext();
  const navigate = useNavigate();

  if (!cartItemsList || !Array.isArray(cartItemsList.cart_products)) return null;

  const isOverSell = cartItemsList.cart_products.some(
    (item) => item.quantity > item.product_inStock
  );

  const totalPrice = cartItemsList.cart_products.reduce((sum, item) => {
    return sum + item.product_price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (isOverSell) {
      toast.error('Sản phẩm trong giỏ hàng vượt quá số lượng tồn kho!');
      return;
    }
    navigate(`/checkout/${cartItemsList._id}`);
  };

  return (
    <div className="w-full sm:w-[30%] h-auto p-2 sm:p-10">
      <div className="w-full bg-white shadow-md rounded-xl p-6 h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Tóm tắt đơn hàng</h2>

        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Khuyến mãi</span>
          <span className="text-gray-800">{formatCurrency(0)}</span>
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className="text-gray-800">{formatCurrency(0)}</span>
        </div>

        <div className="flex justify-between py-4 text-lg font-semibold">
          <span>Tổng cộng</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>

        <div className="flex w-full items-center justify-between">
          <button
            className="py-2 bg-black text-white rounded-md w-[38%] text-md hover:bg-gray-800 transition"
            onClick={handleCheckout}
          >
            Thanh toán
          </button>
          <button
            className="py-2 bg-black text-white rounded-md w-[55%] text-md hover:bg-gray-800 transition"
            onClick={() => navigate('/shop')}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
