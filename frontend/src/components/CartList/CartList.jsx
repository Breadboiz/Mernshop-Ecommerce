import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';
import useDeleteCartItem from '../../hooks/useDeleteCartItem';

const CartList = ({ cartItemsList, updateProductQuantity, refresh }) => {
  const [quantities, setQuantities] = useState(() => {
    if (!cartItemsList?.cart_products) return {};
    return cartItemsList.cart_products.reduce((acc, item) => {
      acc[item._id] = item.quantity;
      return acc;
    }, {});
  });

  const [loadingItems, setLoadingItems] = useState({});
  const { deleteCartItem } = useDeleteCartItem();

  if (!cartItemsList || !Array.isArray(cartItemsList.cart_products)) {
    return (
      <div className="p-4 text-gray-500 text-center w-full">
        Không có sản phẩm trong giỏ hàng.
      </div>
    );
  }

  const handleChangeQuantity = async (productId, newQuantity) => {
    const oldQuantity = quantities[productId];
    if (oldQuantity === newQuantity || newQuantity < 1) return;

    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      await axiosInstance.put(
        '/cart/update',
        {
          userID: user._id,
          user_order: [
            {
              item_products: [
                {
                  productID: productId,
                  quantity: newQuantity,
                  old_quantity: oldQuantity,
                },
              ],
            },
          ],
        },
        {
          headers: { 'x-client-id': user._id },
          withCredentials: true,
        }
      );

      updateProductQuantity(productId, newQuantity);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div className="w-full sm:w-[70%] h-auto p-2 sm:p-10">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
      <div className="overflow-x-auto space-y-4">
        {cartItemsList.cart_products.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4"
          >
            <div className="font-bold invisible sm:visible">{index + 1}</div>

            <div className="flex items-center flex-col sm:flex-row gap-3 sm:w-1/3">
              <img
                src={item.product_thumbnail.url}
                alt={item.product_name}
                className="w-[75px] h-[75px] rounded-lg object-cover"
              />
              <span className="font-medium text-center sm:text-left">
                {item.product_name}
              </span>
            </div>

            <div className="text-center sm:w-[80px] font-semibold">
              {item.product_price.toLocaleString()} đ
            </div>

            <div className="flex items-center border border-gray-300 rounded-3xl w-fit">
              <button
                type="button"
                onClick={() =>
                  handleChangeQuantity(
                    item._id,
                    Math.max(1, quantities[item._id] - 1)
                  )
                }
                disabled={loadingItems[item._id]}
                className="py-1 px-2 text-lg font-semibold rounded pl-2"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={quantities[item._id]}
                onChange={(e) =>
                  handleChangeQuantity(
                    item._id,
                    Math.max(1, parseInt(e.target.value) || 1)
                  )
                }
                disabled={loadingItems[item._id]}
                className="w-12 text-center border-none py-1 focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  handleChangeQuantity(item._id, quantities[item._id] + 1)
                }
                disabled={loadingItems[item._id]}
                className="py-1 px-2 text-lg font-semibold rounded"
              >
                +
              </button>
            </div>

            <div className="text-center sm:w-[100px] font-bold text-amber-600">
              {(item.product_price * quantities[item._id]).toLocaleString()} đ
            </div>

            <MdDeleteForever
              className="text-2xl text-gray-600 hover:text-amber-600 cursor-pointer"
              onClick={() => deleteCartItem(item._id, refresh)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList;
