import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuthContext } from '../../context/AuthContext';
import useGetcartItems from '../../hooks/useGetcartItems';
import CartList from '../../components/CartList/CartList';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
  const navigate= useNavigate()
  const { authUser } = useAuthContext();
  const { cartItemsList, loading, refresh } = useGetcartItems();

  const [cartState, setCartState] = useState(null);

  useEffect(() => {
    if (cartItemsList) {
      setCartState(cartItemsList);
    }
  }, [cartItemsList]);

  const updateProductQuantity = (productId, newQuantity) => {
    if (!cartState) return;

    const updated = {
      ...cartState,
      cart_products: cartState.cart_products.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      ),
    };

    setCartState(updated); // trigger re-render for both CartList & OrderSummary
  };

  const isEmptyCart = !cartState || !Array.isArray(cartState.cart_products) || cartState.cart_products.length === 0;

  return (
    <div className="flex flex-col flex-grow w-full min-h-screen absolute scroll-smooth">
      <Navbar />

      {loading ? (
        <span className="skeleton w-full h-[60vh]"></span>
      ) : isEmptyCart ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
          <img src="../src/assets/empty-cart.png" alt="Empty cart" className="w-40 sm:w-60 mb-4" />
          <div className="flex flex-col items-center justify-center gap-y-5 text-lg sm:text-xl font-medium text-center">Giỏ hàng của bạn đang trống <p onClick={() => navigate('/shop') } className='flex items-center gap-5 border border-gray-200 cursor-pointer hover:bg-blue-600 hover:text-white duration-150 text-center p-3'> <span>Mua sắm ngay nào</span> <MdAddShoppingCart /></p></div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row w-full sm:w-[80%] mx-auto h-auto">
          <CartList
            cartItemsList={cartState}
            updateProductQuantity={updateProductQuantity}
            refresh={refresh}
          />
          <OrderSummary cartItemsList={cartState} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CartPage;
