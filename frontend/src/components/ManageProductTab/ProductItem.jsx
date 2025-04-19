import { FilePenLine, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useDeleteProduct from '../../hooks/useDeleteProduct';
import axiosInstance from '../../lib/axios';

const ProductItem = ({ index, product, cb }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(product.product_inStock);
  const { loading, deleteProduct } = useDeleteProduct();

  const updateProductStock = async (newVal) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const clientId = user?._id;
      console.log("newVal", newVal);
      await axiosInstance.put(
        `/inventory/${product._id}`,
        { quantity: newVal },
        {
          headers: {
            "Content-Type": "application/json",
            "x-client-id": clientId,
          },
          withCredentials: true,
        }
      );

      toast.success("Cập nhật kho hàng thành công");
      cb?.(); // callback để load lại danh sách nếu có
    } catch (error) {
      console.error("❌ Update failed:", error);
      toast.error("Cập nhật thất bại.");
    }
  };

  const handleDecrease = () => {
    const newVal = Math.max(0, quantity - 1);
    setQuantity(newVal);
    updateProductStock(newVal);
  };

  const handleIncrease = () => {
    const newVal = quantity + 1;
    setQuantity(newVal);
    updateProductStock(newVal);
  };

  const handleChange = (e) => {
    const val = Math.max(0, parseInt(e.target.value) || 0);
    setQuantity(val);
    updateProductStock(val);
  };

  return (
    <li className="flex   w-full h-[7rem] items-center px-2 sm:px-10 justify-between border-b border-gray-200">
      <div className="w-[50%] flex items-center h-full">
        <div className="text-4xl font-thin opacity-30 tabular-nums">{index}</div>
        <div className="w-[10rem]" onClick={() => navigate(`/shop/${product.slug}`)}>
          <img
            className="size-20 rounded-box cursor-pointer"
            src={product.product_thumbnail.url}
            alt=""
          />
        </div>
        <div className="list-col-grow gap-5">
          <div>{product.product_name}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {product.product_category}
          </div>
          <div>Mã sản phẩm: {product._id}</div>
        </div>
        <div>
        </div>
      </div>
      
      <div className='flex flex-col items-center gap-y-3 '>
      <div className="text-xs uppercase font-semibold opacity-60">
            {product.product_inStock} sản phẩm
          </div>
      <div className="flex items-center border border-gray-300 rounded-3xl w-fit">
            <button type="button" onClick={handleDecrease} className="py-1 px-2 text-lg font-semibold rounded pl-2">−</button>
            <input
              type="number"
              value={quantity}
              min="0"
              onChange={handleChange}
              className="w-12 text-center border-none py-1 focus:outline-none"
            />
            <button type="button" onClick={handleIncrease} className="py-1 px-2 text-lg font-semibold rounded">+</button>
          </div>
      </div>

      <div className='flex flex-col items-center gap-y-3 '>
        <div>Đã bán</div>
        <div>
          {product.product_sold}
        </div>
      </div>

      <div className="flex items-center">
        <button className="btn btn-square btn-ghost">
          <FilePenLine
            className="hover:text-amber-500"
            onClick={() => navigate(`/admin-dashboard/update/${product._id}`)}
          />
        </button>

        <button
          className="btn btn-square btn-ghost"
          onClick={() => deleteProduct(product._id, cb)}
        >
          {loading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            <Trash2 className="hover:text-amber-500" />
          )}
        </button>
      </div>
    </li>
  );
};

export default ProductItem;
