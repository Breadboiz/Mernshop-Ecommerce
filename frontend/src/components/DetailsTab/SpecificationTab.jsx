import React from 'react'

const SpecificationTab = ({ product}) => {
  return (
<div className="w-full">
  <table className=" table-auto table-zebra w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden shadow-md">
    <thead className="bg-gray-100 text-gray-900 uppercase text-xs tracking-wider">
      <tr>
        <th className="px-4 py-3 border-b border-gray-200">Thông tin</th>
        <th className="px-4 py-3 border-b border-gray-200">Chi tiết</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">Thương hiệu</td>
        <td className="px-4 py-3">{product.product_brand}</td>
      </tr>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">Loại sản phẩm</td>
        <td className="px-4 py-3">Đồng hồ {product.product_category}</td>
      </tr>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">Chất liệu vỏ</td>
        <td className="px-4 py-3">{product.product_material}</td>
      </tr>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">Bộ máy</td>
        <td className="px-4 py-3">{product.product_mechanism}</td>
      </tr>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">Chống nước</td>
        <td className="px-4 py-3">{product.product_water_resistance}</td>
      </tr>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">Đường kính dây</td>
        <td className="px-4 py-3">{product.product_case_diameter}</td>
      </tr>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">Chất liệu dây</td>
        <td className="px-4 py-3">{product.product_band_material}</td>
      </tr>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">Thiết kế bề mặt</td>
        <td className="px-4 py-3">{product.product_dial_design}</td>
      </tr>
      <tr className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">Bảo hành</td>
        <td className="px-4 py-3">{product.product_warranty}</td>
      </tr>
    </tbody>
  </table>
</div>
  )
}

export default SpecificationTab