import React, { createContext, useState, useContext } from 'react';

// 1. Tạo context
export const CartContext = createContext();

// 2. Hook custom
export const useCartContext = () => useContext(CartContext);

// 3. Provider
export const CartContextProvider = ({ children }) => {
  // ✅ Đặt tên state khác với tên context để tránh xung đột hoặc nhầm lẫn
  const [cartState, setCartState] = useState({
    selectedCart: null,
    Cart: [],
  });

  return (
    <CartContext.Provider value={{ cartState, setCartState }}>
      {children}
    </CartContext.Provider>
  );
};
