import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';

const AccountDetails = () => {
  const { authUser, setAuthUser } = useAuthContext();
    console.log(authUser)
  const [formData, setFormData] = useState({
    street: authUser.address?.street || '',
    ward: authUser.address?.ward || '',
    district: authUser.address?.district || '',
    city: authUser.address?.city || '',
    country: authUser.address?.country || '',
    phone: authUser.phone || '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      address: {
        street: formData.street,
        ward: formData.ward,
        district: formData.district,
        city: formData.city,
        country: formData.country,
      },
      phone: formData.phone,
    };

    try {
      
     const userID = authUser._id;  
      const res = await axiosInstance.put('/user/update', payload, { 
        headers: {
        'x-client-id': userID,
      }, withCredentials: true });
      const updatedUser = res.data.metadata;
      setAuthUser(prev => ({ ...prev, ...updatedUser }));
      localStorage.setItem('user', JSON.stringify({ ...authUser, ...updatedUser }));
      toast.success('Cập nhật thông tin thành công!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật');
    }
  };

  return (
    <div className="w-full  mx-auto space-y-6 bg-white ">
      <h1 className=" text-3xl font-bold text-gray-800">Chi tiết tài khoản</h1>
        
      {/* Avatar + Info */}
        <div className='flex flex-col sm:flex-row justify-between items-start mb-6 '>
        <div className="flex items-center gap-6">
        <img
          src={`https://avatar.iran.liara.run/username?username=${authUser.username}`}
          alt="avatar"
          className="w-[80px] h-[80px] rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-700">{authUser.username}</h2>
          <p className="text-gray-500">{authUser.email}</p>
          <p className="text-gray-500">
            Vai trò:{" "}
            <span className="font-medium text-black">
              {authUser.role === 'AD' ? 'Admin' : 'Khách hàng'}
            </span>
          </p>
        </div>
      </div>

      {/* Shipping Section */}
      <Section title="Thông tin giao hàng">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Đường/Số nhà"
            value={formData.street}
            onChange={(e) => handleChange('street', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            placeholder="Phường/Xã"
            value={formData.ward}
            onChange={(e) => handleChange('ward', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            placeholder="Quận/Huyện"
            value={formData.district}
            onChange={(e) => handleChange('district', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            placeholder="Tỉnh/Thành phố"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            placeholder="Quốc gia"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <input
            type="tel"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={11}
            placeholder="Số điện thoại người nhận"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
      </Section>
        </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 w-full sm:w-2/3">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
    {children}
  </section>
);

export default AccountDetails;
