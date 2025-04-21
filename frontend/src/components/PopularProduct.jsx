import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Mũi tên điều hướng
import { Link, useNavigate } from "react-router-dom";
import useGetProductByFilter from '../hooks/useGetProductByFilter'


const PopularProduct = () => {
  const navigate = useNavigate();
  const {products} = useGetProductByFilter();
  return (
    <div className="relative w-full px-[2rem] lg:px-[10rem]  py-30 ">
      <h2 className="text-center text-2xl font-semibold mb-6">Bán chạy nhất</h2>

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
           breakpoints={{
            320: { slidesPerView: 1 },  // Mobile nhỏ
            480: { slidesPerView: 2 },  // Mobile lớn
            768: { slidesPerView: 3 },  // Tablet
            1024: { slidesPerView: 4 }, // Desktop
          }} // Hiển thị tối đa 6 sản phẩm
          spaceBetween={20} // Khoảng cách giữa các sản phẩm
          navigation={{
            nextEl: ".next-button",
            prevEl: ".prev-button",
          }}
          modules={[Navigation]}
          className="mySwiper"
          slidesPerGroup={1} // Di chuyển 1 sản phẩm mỗi lần
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className="bg-white p-4 rounded-lg shadow-lg hover:translate-y-[-10px] hover:shadow-[17px_18px_9px_-7px_rgba(0,_0,_0,_0.1)] duration-300 ease-in">
              
            <div className='mb-2'><img src={product.product_thumbnail.url} alt="" className='' /></div>
            <div className='mb-2 text-md font-medium line-clamp-1 hover:line-clamp-2 text-center'>{product.product_name}</div>
            <div className='mb-2 text-sm text-gray-500 font-light  text-center '>{product.product_category}</div>
            <div className='mb-2 text-sm text-gray-500 font-light line-clamp-2 text-center'>
                {product.product_description}
            </div>
            <div className='flex flex-col items-center justify-between'> 
               <div className='mb-2 text-sm text-red-500 font-semibold'>{product.product_price}VND</div>
               <button className="btn  btn-outline mb-5" onClick={() => navigate(`/shop/${product.slug}`)}>Buy now</button>
            </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nút điều hướng */}
        <button className="prev-button absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <button className="next-button absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
          <ChevronRight size={24} />
        </button>
      </div>

      <button className="btn btn-outline btn-primary absolute left-1/2 transform -translate-x-1/2 my-5"
      onClick={() =>navigate('/shop')}
      >Xem thêm sản phẩm</button>

    </div>
  );
};

export default PopularProduct;



// <div className='flex flex-col items-center justify-center w-full h-auto bg-white p-2 border-b border-black px-2
//        hover:translate-y-[-5px] hover:shadow-[5px_6px_6px_0px_rgba(0,_0,_0,_0.1)] duration-100
//        '>
//        </div>