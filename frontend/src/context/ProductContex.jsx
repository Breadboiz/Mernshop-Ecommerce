import React, { createContext, useState, useContext } from 'react';

// 1. Tạo context
export const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = ({ children }) => {
  const [productContext, setProductContext] = useState({
    selectedProduct: null,
    products: [],
    filter: {},
  });

  return (
    <ProductContext.Provider value={{ productContext, setProductContext }}>
      {children}
    </ProductContext.Provider>
  );
};