import React from 'react'
import {useNavigate} from 'react-router-dom'
const OrderItem = ({order, loading, index}) => {
  const navigate = useNavigate();
  // if (loading) {
  //   return (
  //     <div className="w-full p-4 border rounded shadow-md animate-pulse">
  //       <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
  //       <div className="h-4 bg-gray-300 rounded w-1/3"></div>
  //     </div>
  //   );
  // }
  return (
    
    <div className= {loading?"skeleton":"w-full flex flex-col sm:flex-row items-center hover:bg-slate-100 cursor-pointer gap-5 py-1 pl-5 border border-slate-200"}
    onClick={()=>{
      navigate(`/order-details/${order._id}`)
    }}
    >
        <div className='text-xl hidden sm:block'>{index + 1}</div>
        <div className='flex flex-col sm:flex-row gap-5 items-center justify-center'>
            <div>
              <img src={order.order_products?.[0]?.product_thumbnail?.url} alt={order.order_products?.[0]?.product_name} className='w-[75px] h-[75px] object-cover'/>
              
            </div>
            <div className='flex flex-col gap-1'>
                <div
                  className={`h-auto ${
                    order.order_status === "pending"
                      ? "text-yellow-500 font-semibold"
                      : order.order_status === "cancelled"
                      ? "text-red-500 font-semibold"
                      : "text-green-600 font-semibold"
                  }`}
                >
                  Trạng thái: {order.order_status}
                </div>
                <div>
                 <span className='mr-2 text-slate-400'>Đơn hàng </span> 
                 <span className='text-slate-500 font-semibold'>#{order._id}</span>
                </div>
                <div>
                  <span className='mr-2 text-slate-400'>Thời gian:   </span>
                  <span className='text-slate-500 font-semibold'> {new Date(order.createdAt).toLocaleString('vi-VN')}</span>  
                </div>
                <div>
                  <span className='mr-2 text-slate-400'>Tổng tiền:   </span>
                  <span className='text-slate-500 font-semibold'> {order.order_checkout.totalPrice}</span>
                  
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default OrderItem