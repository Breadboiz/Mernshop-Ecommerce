import React from 'react'
import {formatCurrency} from '../../utils/formatCurrency.js'
const OrderSummary = ({cartItemsList}) => {
if (!cartItemsList || !cartItemsList.cart_products) return null;

const totalPrice = cartItemsList.cart_products.reduce((sum, item) => {
  return sum + item.product_price * item.quantity;
}, 0);
  return (
    <div className='w-full sm:w-[30%] h-auto  p-2 sm:p-10' >
    <div className="w-full  bg-white shadow-md rounded-xl p-6 h-fit">
    <h2 className="text-xl font-bold mb-4 text-gray-800">Tóm tắt đơn hàng</h2>

    <div className="flex justify-between py-2 border-b">
      <span className="text-gray-600">Tổng phụ</span>
      <span className="text-gray-800">adadadad</span>
    </div>

    <div className="flex justify-between py-2 border-b">
      <span className="text-gray-600">Phí vận chuyển</span>
      <span className="text-gray-800">adadawdawdad</span>
    </div>

    <div className="flex justify-between py-4 text-lg font-semibold">
      <span>Tổng cộng</span>
      <span>{formatCurrency(totalPrice)}</span>
    </div>

    <button
      className="mt-6 w-full px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
      onClick={() => alert('Thanh toán nè!')}
    >
      Tới trang thanh toán
    </button>
  </div>

    </div>
  )
}

export default OrderSummary


