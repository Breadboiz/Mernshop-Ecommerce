import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';
import useDeleteCartItem from '../../hooks/useDeleteCartItem';

const CartList = ({ cartItemsList, updateProductQuantity, refresh }) => {
  const { deleteCartItem } = useDeleteCartItem();

  const [quantities, setQuantities] = useState(() => {
    if (!cartItemsList?.cart_products) return {};
    return cartItemsList.cart_products.reduce((acc, item) => {
      acc[item._id] = item.quantity;
      return acc;
    }, {});
  });

  const [loadingItems, setLoadingItems] = useState({});

  if (!cartItemsList || !Array.isArray(cartItemsList.cart_products)) {
    return (
      <div className="p-4 text-gray-500 text-center w-full">
        Không có sản phẩm trong giỏ hàng.
      </div>
    );
  }

  const handleQuantityChange = async (productId, newQuantity, maxQuantity) => {
    const oldQuantity = quantities[productId];
    if (newQuantity < 1 || newQuantity === oldQuantity || newQuantity > maxQuantity) return;

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
      // Khôi phục lại số lượng cũ nếu lỗi
      setQuantities((prev) => ({ ...prev, [productId]: oldQuantity }));
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <div className="w-full sm:w-[70%] h-auto p-2 sm:p-10">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

      <div className="overflow-x-auto space-y-4">
        {cartItemsList.cart_products.map((item, index) => {
          const { _id, product_name, product_thumbnail, product_price, product_inStock } = item;

          const currentQty = quantities[_id] || 1;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4"
            >
              <div className="font-bold invisible sm:visible">{index + 1}</div>

              <div className="flex items-center flex-col sm:flex-row gap-3 sm:w-1/3">
                <img
                  src={product_thumbnail.url}
                  alt={product_name}
                  className="w-[75px] h-[75px] rounded-lg object-cover"
                />
                <span className="font-medium text-center sm:text-left">{product_name}</span>
              </div>

              <div className="text-center sm:w-[80px] font-semibold">
                {product_price.toLocaleString()} đ
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-3xl w-fit">
                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange(_id, currentQty - 1, product_inStock)
                  }
                  disabled={loadingItems[_id] || currentQty <= 1} // Disable giảm khi <= 1
                  className={`py-1 px-2 text-lg font-semibold pl-2 ${
                    currentQty <= 1 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={currentQty}
                  onChange={(e) =>
                    handleQuantityChange(
                      _id,
                      Math.max(1, parseInt(e.target.value) || 1),
                      product_inStock
                    )
                  }
                  disabled={loadingItems[_id]}
                  className="w-12 text-center border-none py-1 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange(_id, currentQty + 1, product_inStock)
                  }
                  disabled={loadingItems[_id] || currentQty >= product_inStock} // Disable tăng khi đạt tồn kho
                  className={`py-1 px-2 text-lg font-semibold ${
                    currentQty >= product_inStock ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  +
                </button>
              </div>

              <div className="text-center sm:w-[100px] font-bold text-amber-600">
                {(product_price * currentQty).toLocaleString()} đ
              </div>

              <MdDeleteForever
                className="text-2xl text-gray-600 hover:text-amber-600 cursor-pointer"
                onClick={() => deleteCartItem(_id, refresh)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartList;
