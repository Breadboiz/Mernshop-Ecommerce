const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Cột 1: Giới thiệu */}
        <div className=" mx-auto">
          <h2 className="text-white text-xl font-semibold mb-4">🕰️ Về chúng tôi</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Chúng tôi chuyên cung cấp các mẫu đồng hồ chính hãng, thời trang và sang trọng cho mọi phong cách sống. Uy tín và chất lượng là ưu tiên hàng đầu.
          </p>
        </div>

        {/* Cột 2: Đường dẫn */}
        <div className="mx-auto">
          <h2 className="text-white text-xl font-semibold mb-4">🔗 Liên kết nhanh</h2>
          <ul className="text-sm space-y-3 text-gray-400">
            <li><a href="/" className="hover:text-white transition duration-200">Trang chủ</a></li>
            <li><a href="/products" className="hover:text-white transition duration-200">Sản phẩm</a></li>
            <li><a href="/about" className="hover:text-white transition duration-200">Giới thiệu</a></li>
            <li><a href="/contact" className="hover:text-white transition duration-200">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 3: Mạng xã hội */}
        <div className=" mx-auto">
          <h2 className="text-white text-xl font-semibold mb-4">🌐 Kết nối với chúng tôi</h2>
          <div className="flex items-center space-x-4 text-2xl">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-200">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-200">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-sky-400 transition duration-200">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600 transition duration-200">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Dòng cuối */}
      <div className="mt-2 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Đồng Hồ Sang Trọng. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
