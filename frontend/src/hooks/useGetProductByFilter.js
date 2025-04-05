import { useEffect } from 'react';
import axiosInstance from '../lib/axios';

// Custom hook chỉ fetch dữ liệu
const useGetProductByFilter = (filter, setProducts) => {
  const { searchKeyword, selectedBrand, selectedCategory } = filter;

  // Fetch products từ API khi các bộ lọc thay đổi
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products', {
        params: {
          name: searchKeyword || undefined,  // Sử dụng undefined để không gửi tham số khi không có giá trị
          product_branch: selectedBrand || undefined,
          category: selectedCategory || undefined,
        }
      });
      setProducts(response.data);  // Cập nhật danh sách sản phẩm thông qua hàm setProducts
    } catch (error) {
      console.error("Lỗi khi tìm sản phẩm:", error);
    }
  };

  // Lấy dữ liệu khi các giá trị thay đổi
  useEffect(() => {
    fetchProducts();  // Gọi lại fetch mỗi khi có thay đổi trong các bộ lọc
  }, [filter]);  // Chạy lại fetch khi đối tượng filter thay đổi

};

export default useGetProductByFilter;
