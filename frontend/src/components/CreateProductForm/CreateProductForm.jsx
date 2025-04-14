import React, { useState } from "react";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const CreateProductForm = ({ onSubmit }) => {
  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    product_name: '',
    product_brand: '',
    product_price: '',
    product_inStock: '',
    product_sold: '',
    product_category: '',
    product_material: '',
    product_mechanism: '',
    product_water_resistance: '',
    product_case_diameter: '',
    product_band_material: '',
    product_warranty: '',
    product_dial_design: '',
    product_images: [],
    product_thumbnail: null,
    product_description: '',
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
      if (name === "product_images") {
        setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
      } else if (name === "product_thumbnail") {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const form = new FormData();
    form.append("product_name", formData.product_name);
    form.append("product_brand", formData.product_brand);
    form.append("product_price", Number(formData.product_price));
    form.append("product_inStock", Number(formData.product_inStock));
    form.append("product_sold", Number(formData.product_sold));
    form.append("product_category", formData.product_category);
    form.append("product_material", formData.product_material);
    form.append("product_mechanism", formData.product_mechanism);
    form.append("product_water_resistance", formData.product_water_resistance);
    form.append("product_case_diameter", Number(formData.product_case_diameter));
    form.append("product_band_material", formData.product_band_material);
    form.append("product_warranty", formData.product_warranty);
    form.append("product_dial_design", formData.product_dial_design);
    form.append("product_description", formData.product_description);

    if (formData.product_thumbnail) {
      form.append("product_thumbnail", formData.product_thumbnail);
    }

    if (formData.product_images.length > 0) {
      formData.product_images.forEach((file) => {
        form.append("product_images", file);
      });
    }
    setloading(true)
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const clientId = user._id;
      const response = await axiosInstance.post("/products/createProduct", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-client-id": clientId,
        },
        withCredentials: true,
      });
      console.log("✅ Product created:", response.data);
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("❌ Error creating product:", error);
      toast.error("Failed to create product.");
    } finally {
      setloading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Thêm sản phẩm</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Tên sản phẩm" name="product_name" value={formData.product_name} onChange={handleChange} />
        <Input label="Thương hiệu" name="product_brand" value={formData.product_brand} onChange={handleChange} />
        <Input label="Giá" name="product_price" type="number" value={formData.product_price} onChange={handleChange} />
        <Input label="Số lượng trong kho" name="product_inStock" type="number" value={formData.product_inStock} onChange={handleChange} />
        <Select label="Loại sản phẩm" name="product_category" value={formData.product_category} options={["nam", "nữ", "đôi"]} onChange={handleChange} />
        <Input label="Chất liệu vỏ" name="product_material" value={formData.product_material} onChange={handleChange} />
        <Select label="Bộ máy" name="product_mechanism" value={formData.product_mechanism} options={["automatic", "quartz", "digital", "smartwatch"]} onChange={handleChange} />
        <Input label="Chống nước" name="product_water_resistance" value={formData.product_water_resistance} onChange={handleChange} />
        <Input label="Đường kính mặt (mm)" name="product_case_diameter" type="number" value={formData.product_case_diameter} onChange={handleChange} />
        <Select label="Kiểu dáng mặt" name="product_dial_design" value={formData.product_dial_design} options={["Tròn/oval", "Vuông/Chữ nhật", "Minimalist", "Vintage", "Sport"]} onChange={handleChange} />
        <Input label="Chất liệu dây" name="product_band_material" value={formData.product_band_material} onChange={handleChange} />
        <Input label="Bảo hành" name="product_warranty" value={formData.product_warranty} onChange={handleChange} />
      </div>

      <div>
        <label className="block font-semibold mb-2">Hình ảnh sản phẩm</label>
        <input type="file" name="product_images" accept="image/*" multiple onChange={handleChange} />
      </div>

      <div>
        <label className="block font-semibold mb-2">Thumbnail</label>
        <input type="file" name="product_thumbnail" accept="image/*" onChange={handleChange} />
      </div>

      <div>
        <label className="block font-semibold mb-2">Mô tả sản phẩm</label>
        <textarea
          name="product_description"
          value={formData.product_description}
          onChange={handleChange}
          rows={6}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          placeholder="Nhập mô tả sản phẩm..."
        ></textarea>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transitio"
      disabled={loading}>
        {loading ? <span className="loading loading-dots loading-sm"></span>: "Tạo sản phẩm" } 
      </button>
    </form>
  );
};


const Input = ({ label, name, type = "text", value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const Select = ({ label, name, value, onChange, options, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">-- Chọn --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

export default CreateProductForm;




// const CreateProductForm = () => {
//   const [loading, setloading] = useState(false);
//   const [product, setProduct] = useState({
//     product_name: "",
//     product_brand: "",
//     product_inStock: 0,
//     product_price: 0,
//     product_description: "",
//     product_category: "nam",
//     rating: 0,
//   });

//   const [thumbnailFile, setThumbnailFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setThumbnailFile(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     for (let key in product) {
//       formData.append(key, product[key]);
//     }

//     if (thumbnailFile) {
//       formData.append("product_image", thumbnailFile);
//     }
//     setloading(true);
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const clientId = user._id;
//       const response = await axiosInstance.post("/products/createProduct", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "x-client-id": clientId
//         },
//         withCredentials: true,
//       });
//       setProduct({
//         product_name: "",
//         product_brand: "",
//         product_inStock: 0,
//         product_price: 0,
//         product_description: "",
//         product_category: "nam",
//         rating: 0,
//       })
//       console.log("✅ Product created:", response.data);
//       toast.success("Product created successfully!");
//     } catch (error) {
//       console.error("❌ Error creating product:", error);
//       toast.error("Failed to create product.");
//     }finally {
//       setloading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-xl mx-auto p-6 bg-white shadow rounded-md space-y-4"
//       encType="multipart/form-data"
//     >
//       <h2 className="text-xl font-semibold mb-4">Create Product</h2>

//       <div>
//         <label className="block mb-1">Product Name</label>
//         <input
//           type="text"
//           name="product_name"
//           value={product.product_name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-1">Product Brand</label>
//         <input
//           type="text"
//           name="product_brand"
//           value={product.product_brand.trim()}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-1">In Stock</label>
//         <input
//           type="number"
//           name="product_inStock"
//           value={product.product_inStock}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           min={0}
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-1">Price</label>
//         <input
//           type="number"
//           name="product_price"
//           value={product.product_price}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           min={0}
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-1">Description</label>
//         <textarea
//         type="text"
//           name="product_description"
//           value={product.product_description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         ></textarea>
//       </div>

//       <div>
//         <label className="block mb-1">Thumbnail</label>
//         <input
//           type="file"
//           name="product_thumbnail"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block mb-1">Category</label>
//         <select
//           name="product_category"
//           value={product.product_category}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="nam">Nam</option>
//           <option value="nữ">Nữ</option>
//           <option value="đôi">Đôi</option>
//         </select>
//       </div>

//       <button
//         disabled={loading}
//         type="submit"
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//       >
//         {
//           loading ? <span className="loading loading-dots loading-sm"></span>
//           : "Create Product"
//         }
//       </button>
//     </form>
//   );
// };






{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Tên sản phẩm" name="product_name" />
            <Input label="Thương hiệu" name="product_brand" />
            <Input label="Giá" name="product_price" type="number" />
            <Input label="Số lượng trong kho" name="product_inStock" type="number" />
            <Select label="Loại sản phẩm" name="product_category" options={["nam", "nữ", "đôi"]} />
            <Input label="Chất liệu vỏ" name="product_material" />
            <Select label="Bộ máy" name="product_mechanism" options={["automatic", "quartz", "digital", "smartwatch"]} />
            <Input label="Chống nước" name="product_water_resistance" />
            <Input label="Đường kính mặt (mm)" name="product_case_diameter" type="number" />
            <Select label="Kiểu dán mặt" name="product_dial_design" options={["Tròn/oval", "Vuông/Chữ nhật", "Minimalist (tối giản), Vintage, Sport"]} />
            <Input label="Chất liệu dây" name="product_band_material" />
            <Input label="Bảo hành" name="product_warranty" />
          </div> */}