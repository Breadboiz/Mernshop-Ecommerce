'use strict';
const { getAnalyticsData, getDailySaleData } = require('../services/analytics.services');
const { SuccessResponse} = require('../core/success.response');

const getAnalytics = async (req, res) => {
  
    const endDay =new Date();
    const startDay = new Date(endDay.getTime() - 24 * 60 * 60 * 1000 * 7); // 24 hours ago
    const dailySalesData = await getDailySaleData(startDay, endDay);
    return new SuccessResponse({
      message: 'Analytics data retrieved successfully',
      metadata: {
        dailySalesData,
        analyticsData: await getAnalyticsData()
      }
    }).send(res);
 
}

module.exports = {
  getAnalytics
};   