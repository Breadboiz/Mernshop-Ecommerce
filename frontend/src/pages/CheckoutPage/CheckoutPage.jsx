import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useGetCheckoutReview from '../../hooks/useGetCheckoutReview';

const CheckoutPage = () => {
  const { cartID } = useParams();
  const { checkoutReview, loading } = useGetCheckoutReview(cartID);

  const [formData, setFormData] = useState({
    shipping: {
      street: '',
      ward: '',
      district: '',
      city: '',
      country: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      order_user_id: 'USER_ID', // Replace with real user ID
      order_shipping: formData.shipping,
      order_payment: formData.payment,
      order_checkout: formData.checkoutSummary,
      order_products: formData.products,
    };
    console.log('Order Payload:', payload);
    // Gửi payload lên server ở đây nếu cần
  };

  const totalAmount = (
    formData.checkoutSummary.totalPrice -
    formData.checkoutSummary.totalApplyDiscount +
    formData.checkoutSummary.shippingFee
  );

  // if (loading) return <div>Đang tải dữ liệu...</div>;
  // if (!checkoutReview) return <div>Không có dữ liệu</div>;
  console.log("checkoutReview", checkoutReview);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Info */}
          <Section title="Thông tin giao hàng">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['street', 'ward', 'district', 'city', 'country'].map((field) => (
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
            Xác nhận đặt hàng
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
