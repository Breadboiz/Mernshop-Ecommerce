import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const CreateProductForm = () => {
  const [product, setProduct] = useState({
    product_name: "",
    product_brand: "",
    product_inStock: 0,
    product_price: 0,
    product_description: "",
    product_category: "nam",
    rating: 0,
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in product) {
      formData.append(key, product[key]);
    }

    if (thumbnailFile) {
      formData.append("product_image", thumbnailFile);
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const clientId = user._id;
      const response = await axiosInstance.post("/products/createProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-client-id": clientId
        },
        withCredentials: true,
      });
      setProduct({
        product_name: "",
        product_brand: "",
        product_inStock: 0,
        product_price: 0,
        product_description: "",
        product_category: "nam",
        rating: 0,
      })
      console.log("✅ Product created:", response.data);
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("❌ Error creating product:", error);
      toast.error("Failed to create product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow rounded-md space-y-4"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>

      <div>
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          name="product_name"
          value={product.product_name.trim()}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Product Brand</label>
        <input
          type="text"
          name="product_brand"
          value={product.product_brand.trim()}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">In Stock</label>
        <input
          type="number"
          name="product_inStock"
          value={product.product_inStock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          min={0}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Price</label>
        <input
          type="number"
          name="product_price"
          value={product.product_price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          min={0}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="product_description"
          value={product.product_description.trim()}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>
      </div>

      <div>
        <label className="block mb-1">Thumbnail</label>
        <input
          type="file"
          name="product_thumbnail"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Category</label>
        <select
          name="product_category"
          value={product.product_category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="nam">Nam</option>
          <option value="nữ">Nữ</option>
          <option value="đôi">Đôi</option>
        </select>
      </div>

      {/* <div>
        <label className="block mb-1">Rating</label>
        <input
          type="number"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          min={0}
          max={5}
          step={0.1}
        />
      </div> */}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;
