import React from 'react'
import { Link } from 'react-router-dom'
// import React, { useEffect, useState } from 'react';

const Filter = ({ brands, categories, onSelectBrand, onSelectCategory }) => {
  return (
    <div className="flex flex-col w-full sm:w-[20%] h-auto p-2 sm:p-5 items-center">
      <div className="flex flex-col w-full h-full py-10">
        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-xl mb-5">Categories</h2>
          <p className="flex justify-between mb-3 border-b border-gray-200 hover:text-orange-500 hover:font-semibold">
            <Link to="/shop" onClick={() => onSelectCategory("")}>Tất cả</Link>
          </p>
          {categories.map((category, index) => (
            <p
              key={index}
              className="flex justify-between mb-3 border-b border-gray-200 hover:text-orange-500 hover:font-semibold"
            >
              <Link to="/shop" onClick={() => onSelectCategory(category)}>
                Đồng hồ {category}
              </Link>
            </p>
          ))}
        </div>

        {/* Brands */}
        <div className="mb-10">
          <h2 className="text-xl mb-5">Brands</h2>
          <p className="flex justify-between mb-3 border-b border-gray-200 hover:text-orange-500 hover:font-semibold">
            <Link to="/shop" onClick={() => onSelectBrand("")}>
              Tất cả
            </Link>
          </p>
          {brands.map((brand, index) => (
            <p
              key={index}
              className="flex justify-between mb-3 border-b border-gray-200 hover:text-orange-500 hover:font-semibold cursor-pointer"
              onClick={() => onSelectBrand(brand)}
            >
              {brand}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter