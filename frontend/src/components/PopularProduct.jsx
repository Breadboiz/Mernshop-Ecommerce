import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Mũi tên điều hướng
import { Link } from "react-router-dom";
const products = [
  { name: "Tank Top", description: "Finding perfect t-shirt", price: "$50", image: "/assets/tank_top.jpg" },
  { name: "Corater", description: "Finding perfect products", price: "$50", image: "/assets/corater_shoes.jpg" },
  { name: "Polo Shirt", description: "Finding perfect products", price: "$50", image: "/assets/polo_shirt.jpg" },
  { name: "Sneakers", description: "Comfortable sneakers", price: "$60", image: "/assets/sneakers.jpg" },
  { name: "Hoodie", description: "Stylish hoodie", price: "$70", image: "/assets/hoodie.jpg" },
  { name: "Backpack", description: "Durable backpack", price: "$80", image: "/assets/backpack.jpg" },
  { name: "Sunglasses", description: "Cool sunglasses", price: "$30", image: "/assets/sunglasses.jpg" },
];

const PopularProduct = () => {
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
              <div className="flex flex-col items-center  transition-all">
                <img src={product.image} alt={product.name} className="w-full h-[200px] object-cover rounded-lg" />
                <h3 className="text-lg font-semibold text-purple-600 mt-3"></h3>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-purple-600 font-bold">{product.price}</p>
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

      <button className="btn btn-outline btn-primary absolute left-1/2 transform -translate-x-1/2 my-5"><Link to={'/shop'}>Xem thêm sản phẩm</Link></button>

    </div>
  );
};

export default PopularProduct;