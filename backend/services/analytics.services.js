'use strict';
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const orderModel = require('../models/order.model');

const getAnalyticsData = async () => {
  const totalUsers = await userModel.countDocuments();
  const totalProducts = await productModel.countDocuments();
  const totalOrders = await orderModel.countDocuments();

  // Tính tổng số lượng sản phẩm đã bán (totalSales)
  const totalSalesResult = await orderModel.aggregate([
    { $match: { order_status: 'completed' } },
    { $unwind: '$order_products' },
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$order_products.quantity' }
      }
    }
  ]);

  const totalSales = totalSalesResult[0]?.totalSales || 0;

  // Tính tổng doanh thu (totalRevenue)
  const totalRevenueResult = await orderModel.aggregate([
    { $match: { order_status: 'completed' } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$order_checkout.totalPrice' }
      }
    }
  ]);

  const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

  const analyticsData = {
    totalUsers,
    totalProducts,
    totalOrders,
    totalSales,
    totalRevenue
  };

  return analyticsData;
};
const getDailySaleData = async (startDay, endDay) => {
    const start = new Date(startDay);
    const end = new Date(endDay);
  
    // 1. Tính totalSales (tổng sản phẩm bán ra mỗi ngày)
    const salesData = await orderModel.aggregate([
      {
        $match: {
          order_status: 'completed',
          createdAt: { $gte: start, $lte: end }
        }
      },
      { $unwind: '$order_products' },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalSales: { $sum: '$order_products.quantity' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  
    // 2. Tính totalRevenue (tổng tiền mỗi ngày)
    const revenueData = await orderModel.aggregate([
      {
        $match: {
          order_status: 'completed',
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalRevenue: { $sum: '$order_checkout.totalPrice' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  
    // 3. Gộp 2 kết quả lại theo ngày
    const mergedData = salesData.map(sale => {
      const revenueItem = revenueData.find(r => r._id === sale._id);
      return {
        date: sale._id,
        totalSales: sale.totalSales,
        totalRevenue: revenueItem ? revenueItem.totalRevenue : 0
      };
    });
    const allDates = getDatesInRange(startDay, endDay);
    return allDates.map(date => {
      const dataItem = mergedData.find(item => item.date === date);
      return {
        date,
        salesData: dataItem ? dataItem.totalSales : 0,
        revenue: dataItem ? dataItem.totalRevenue : 0
      };
    });
  };
  
  function getDatesInRange(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}
module.exports = {
  getAnalyticsData,
  getDailySaleData
};

