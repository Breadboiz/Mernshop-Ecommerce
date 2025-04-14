import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Filter from '../../components/Filter'
import ProductList from '../../components/Product/ProductList'
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axios';
import {useAuthContext} from "../../context/AuthContext";  
import { useSearchParams } from 'react-router-dom';
import useGetProductByFilter from '../../hooks/useGetProductByFilter';

const ShopPage = () => {
  
  const categories = ['nam', 'nữ','đôi']

  const {searchKeyword, setSearchKeyword} = useAuthContext();
  const [brands, setBrands] = useState([]); 
  //const [products, setProducts] = useState([]);
  const {products, loading } = useGetProductByFilter();
 // const foundProducts =products.products
  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get('/products/brands'); 
      setBrands(response.data.metadata); 
    } catch (error) {
      console.error('Lỗi khi lấy nhãn hiệu:: ', error);
    }
  };



  useEffect(() => {
    fetchBrands(); 
  }, []);


 // console.log("products", products);

  return (
    <div className='flex flex-col flex-grow w-full h-full absolute '>
        <Navbar />
        <div className='flex flex-col sm:flex-row w-full h-auto px-[2rem] lg:px-[6rem]'>
          <Filter brands={brands} 
          categories={categories}
   
           />
          <ProductList products={products}/>
        </div>
        <Footer />
    </div>
  )
}

export default ShopPage








// import Footer from '../../components/Footer'
// import Navbar from '../../components/Navbar'
// import Filter from '../../components/Filter'
// import ProductList from '../../components/Product/ProductList'
// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../lib/axios';
// import {useAuthContext} from "../../context/AuthContext";  
// const ShopPage = () => {
  
//   const {searchKeyword, setSearchKeyword} = useAuthContext();
//   console.log(searchKeyword);
//   const [selectedBrand, setSelectedBrand] = useState(""); // Lọc theo chi nhánh
//   const [selectedCategory, setSelectedCategory] = useState(""); // Lọc theo danh mục
//   const [categories, setCategories] = useState([]); // Lưu trữ danh sách danh mục
//   const [brands, setBrands] = useState([]); // Lưu trữ danh sách chi nhánh
  
//   const [products, setProducts] = useState([]);
//   const fetchCategories = async () => {
//     try {
//       const response = await axiosInstance.get('/products/categories'); // Gọi API để lấy danh mục
//       setCategories(response.data.metadata); // Cập nhật danh sách danh mục
//     } catch (error) {
//       console.error('Lỗi khi lấy danh mục:', error);
//     }
//   };

//   // Hàm gọi API để lấy chi nhánh
//   const fetchBrands = async () => {
//     try {
//       const response = await axiosInstance.get('/products/brands'); // Gọi API để lấy chi nhánh
//       setBrands(response.data.metadata); // Cập nhật danh sách chi nhánh
//     } catch (error) {
//       console.error('Lỗi khi lấy nhãn hiệu:: ', error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axiosInstance.get('/products', {
//         params: {
//           name: searchKeyword || undefined,
//           product_brand: selectedBrand || undefined,  // ✅ sửa key thành product_brand
//           category: selectedCategory || undefined,
//         }
        
//       });
//       setProducts(response.data.metadata);
      
//        // Cập nhật danh sách sản phẩm
//     } catch (error) {
//       console.error("Lỗi khi tìm sản phẩm:", error);
//     }
//   };
  
//   const  handleSelectBrand = (brand) => {
//     setSelectedBrand(brand);
//     setSelectedCategory("");
//     if(searchKeyword){
//       setSearchKeyword("")
//     }
//   };
//   const handleSelectCategory = (category) => {
//     setSelectedCategory(category);
//     setSelectedBrand("");
//     if(searchKeyword){
//       setSearchKeyword("")
//     }
//   }

//   useEffect(() => {
//     fetchCategories(); // Lấy danh mục khi trang được tải
//     fetchBrands(); // Lấy chi nhánh khi trang được tải
//     fetchProducts(); // Lấy tất cả sản phẩm ban đầu
//   }, [ searchKeyword,selectedBrand, selectedCategory]);

//   // console.log("brands", brands.metadata);
//   // console.log("categories", categories.metadata);
//   console.log("products", products);

//   return (
//     <div className='flex flex-col flex-grow w-full h-full absolute '>
//         <Navbar />
//         <div className='flex flex-col sm:flex-row w-full h-auto px-[2rem] lg:px-[6rem]'>
//           <Filter brands={brands} 
//           categories={categories}
//            onSelectBrand={handleSelectBrand}
//            onSelectCategory={handleSelectCategory}
//            />
//           <ProductList products={products}/>
//         </div>
//         <Footer />
//     </div>
//   )
// }

// export default ShopPage