import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useGetCheckoutReview from '../../hooks/useGetCheckoutReview';
import { useAuthContext } from '../../context/AuthContext';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';
import { hasEmptyValue } from '../../utils/hasEmptyValue';
import {useNavigate} from 'react-router-dom'
const CheckoutPage = () => {
  const navigate = useNavigate()
  const {authUser} = useAuthContext();
  const { cartID } = useParams();
  const { checkoutReview } = useGetCheckoutReview(cartID);
  const [loading, setLoading] = useState(false)
  // console.log(authUser);
  const [formData, setFormData] = useState({
    phone: authUser.phone,
    shipping: {
      street: authUser.address.street,
      ward: authUser.address.ward,
      district: authUser.address.district,
      city: authUser.address.city,
      country: authUser.address.country || "Việt Nam",
    },
    payment: {
      paymentMethod: 'cod',
      paymentStatus: 'unpaid',
    },
    checkoutSummary: {
      totalPrice: 0,
      totalApplyDiscount: 0,
      shippingFee: 0,
    },
    products: [],
  });

  useEffect(() => {
    if (checkoutReview) {
      setFormData(prev => ({
        ...prev,
        checkoutSummary: {
          totalPrice: checkoutReview.totalPrice || 0,
          totalApplyDiscount: checkoutReview.totalApplyDiscount || 0,
          shippingFee: checkoutReview.shippingFee || 0,
        },
        products: checkoutReview.products || [],
      }));
    }
  }, [checkoutReview]);

  const handleInputChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      order_username: authUser.username,
      order_phone: formData.phone,
      order_user_id: authUser._id, // Replace with real user ID
      order_shipping: formData.shipping,
      order_payment: formData.payment,
      order_checkout: formData.checkoutSummary,
      order_products: formData.products,
    };
    if (hasEmptyValue(payload.order_shipping) || !payload.order_phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin giao hàng");
      return
    }
    console.log('Order Payload:', payload);
    setLoading(true)
    try {
      const userID= authUser._id;
      console.log(userID);
      const res = await axiosInstance.post('/order', payload, {
        headers: {
          "x-client-id": userID
        },
        withCredentials: true
      })
      toast.success(res.data.message);
      console.log(res.data.metadata)
      navigate(`/order-details/${res.data.metadata._id}`)
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
    }
    finally{
      setLoading(false)
    }
    // Gửi payload lên server ở đây nếu cần
  };

  const totalAmount = (
    formData.checkoutSummary.totalPrice -
    formData.checkoutSummary.totalApplyDiscount +
    formData.checkoutSummary.shippingFee
  );

  // if (loading) return <div>Đang tải dữ liệu...</div>;
  // if (!checkoutReview) return <div>Không có dữ liệu</div>;
  // console.log("checkoutReview", checkoutReview);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Info */}
          <Section title="Thông tin giao hàng">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {['street', 'ward', 'district', 'city'].map((field) => (
                <input
                  key={field}
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder={field}
                  value={formData.shipping[field]}
                  onChange={(e) => handleInputChange('shipping', field, e.target.value)}
                  required
                />
              ))}
            </div>
            <div>
            <input
                  type="tel"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={11}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Số điện thoại người nhận"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      handleInputChange('shipping', 'phone', value);
                    }
                  }}
                />
            </div>
          </Section>

          {/* Payment Method */}
          <Section title="Phương thức thanh toán">
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.payment.paymentMethod}
              onChange={(e) => handleInputChange('payment', 'paymentMethod', e.target.value)}
            >
              <option value="cod">Thanh toán khi nhận hàng (COD)</option>
              {/* <option value="bank">Chuyển khoản ngân hàng</option>
              <option value="paypal">Thanh toán qua PayPal</option> */}
            </select>
          </Section>

          {/* Product List */}
          <Section title="Sản phẩm trong đơn hàng"> 
            {formData.products.length === 0 ? (
              <p className="text-gray-500">Không có sản phẩm trong đơn hàng.</p>
            ) : (
              <div className="space-y-4">
                {formData.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-3"
                  >
                   
                    <div className='flex gap-2 items-center '>
                    <div className=''>
                      <img src={product.product_thumbnail.url} alt="" className="w-16 h-16 object-cover" />
                    </div>
                      <p className="font-medium">{product.product_name}</p>
                      <p className="text-sm text-gray-500">Số lượng: {product.quantity}</p>
                    </div>
                    <p className="text-right font-semibold">
                      {(product.price * product.quantity).toLocaleString()}₫
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* Right - Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-20">
          <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
          <div className="space-y-2 text-sm">
            <SummaryRow label="Tạm tính" value={formData.checkoutSummary.totalPrice} />
            <SummaryRow label="Giảm giá" value={-formData.checkoutSummary.totalApplyDiscount} />
            <SummaryRow label="Phí vận chuyển" value={formData.checkoutSummary.shippingFee} />
            <div className="border-t pt-2 flex justify-between font-semibold text-base">
              <span>Tổng cộng</span>
              <span>{totalAmount.toLocaleString()}₫</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white mt-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
            
          >
            {loading ? <span className="loading loading-dots loading-md"></span> : "Xác nhận đặt hàng"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// ✅ Reusable Section wrapper
const Section = ({ title, children }) => (
  <section className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </section>
);

// ✅ Reusable summary row
const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span>{value.toLocaleString()}₫</span>
  </div>
);

export default CheckoutPage;
