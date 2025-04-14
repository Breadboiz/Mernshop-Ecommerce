import React from 'react';

const CommentsTab = () => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto h-full px-6 py-8 rounded-2xl shadow-lg space-y-8 bg">
      {/* Comment Form */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Để lại bình luận</h2>
        <textarea
          placeholder="Viết cảm nghĩ của bạn về sản phẩm..."
          className="w-full border border-gray-300 bg-gray-50 rounded-xl p-4 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          rows={4}
        ></textarea>
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
            Gửi bình luận
          </button>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-white text-lg">
            A
          </div>
          <div className="flex-1 bg-gray-100 p-4 rounded-xl shadow-sm">
            <p className="text-gray-800">Sản phẩm rất đẹp, mình mua tặng người yêu và cô ấy rất thích!</p>
            <span className="text-sm text-gray-500 block mt-2">2 ngày trước</span>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-bold text-white text-lg">
            T
          </div>
          <div className="flex-1 bg-gray-100 p-4 rounded-xl shadow-sm">
            <p className="text-gray-800">Đồng hồ sang trọng, giao hàng nhanh và đóng gói cẩn thận.</p>
            <span className="text-sm text-gray-500 block mt-2">5 ngày trước</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsTab;
