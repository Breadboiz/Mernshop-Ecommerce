import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuthContext } from '../../context/AuthContext';
import useGetcartItems from '../../hooks/useGetcartItems';
import CartList from '../../components/CartList/CartList';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const CartPage = () => {
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
          <img src="/empty-cart.svg" alt="Empty cart" className="w-40 sm:w-60 mb-4" />
          <p className="text-lg sm:text-xl font-medium">Giỏ hàng của bạn đang trống.</p>
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
