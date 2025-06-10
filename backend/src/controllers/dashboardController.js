import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// --- Helper Functions ---

/**
 * Lấy số tuần ISO trong năm.
 * @param {Date} date - Ngày cần kiểm tra.
 * @returns {number} - Số tuần.
 */
function getWeekNumber(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

/**
 * Định dạng dữ liệu biểu đồ, lấp đầy các khoảng trống không có dữ liệu bằng giá trị 0.
 * @param {Array} statsData - Dữ liệu thô từ MongoDB aggregate.
 * @param {number} intervals - Số lượng khoảng thời gian (7 ngày, 6 tuần, 6 tháng).
 * @param {'day' | 'week' | 'month'} view - Chế độ xem.
 * @param {string} dataKey - Tên key của dữ liệu (ví dụ: 'doanhThu' hoặc 'soLuong').
 * @returns {Array} - Mảng dữ liệu đã được định dạng cho biểu đồ.
 */
function formatChartData(statsData, intervals, view, dataKeys) {
  const chartData = [];
  const now = new Date();

  for (let i = intervals - 1; i >= 0; i--) {
    const date = new Date();
    let name = "";
    let matchCondition = (item) => false;

    if (view === "day") {
      date.setDate(now.getDate() - i);
      name = `${date.getDate()}/${date.getMonth() + 1}`;
      matchCondition = (item) =>
        item._id.day === date.getDate() &&
        item._id.month === date.getMonth() + 1 &&
        item._id.year === date.getFullYear();
    } else if (view === "week") {
      date.setDate(now.getDate() - i * 7);
      const week = getWeekNumber(date);
      const year = date.getFullYear();
      name = `Tuần ${week}`;
      matchCondition = (item) =>
        item._id.week === week && item._id.year === year;
    } else {
      // month
      date.setMonth(now.getMonth() - i);
      name = `Tháng ${date.getMonth() + 1}`;
      matchCondition = (item) =>
        item._id.month === date.getMonth() + 1 &&
        item._id.year === date.getFullYear();
    }

    const found = statsData.find(matchCondition);
    const dataPoint = { name };

    dataKeys.forEach((key) => {
      dataPoint[key.keyInChart] = found ? found[key.keyInDb] : 0;
    });

    chartData.push(dataPoint);
  }
  return chartData;
}

// --- Main Controller ---

export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();

    // 1. TÍNH TOÁN CÁC SỐ LIỆU TỔNG QUAN
    const [totalUsers, totalOrders, totalProducts, revenueAgg, discountAgg] =
      await Promise.all([
        User.countDocuments(),
        Order.countDocuments(),
        Product.countDocuments(),
        Order.aggregate([
          { $match: { status: { $ne: "cancelled" } } },
          { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ]),
        Order.aggregate([
          { $match: { status: { $ne: "cancelled" } } },
          { $group: { _id: null, totalDiscount: { $sum: "$discountAmount" } } },
        ]),
      ]);

    const totalRevenue = revenueAgg[0]?.total || 0;
    const totalDiscount = discountAgg[0]?.totalDiscount || 0;

    // 2. CHUẨN BỊ CHO VIỆC LẤY DỮ LIỆU BIỂU ĐỒ
    // Xác định khoảng thời gian
    const last7Days = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 6
    );
    const last6Weeks = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 41
    );
    const last6Months = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // Xác định cách nhóm dữ liệu (grouping)
    const dayGroupId = {
      day: { $dayOfMonth: "$createdAt" },
      month: { $month: "$createdAt" },
      year: { $year: "$createdAt" },
    };
    const weekGroupId = {
      week: { $isoWeek: "$createdAt" },
      year: { $isoWeekYear: "$createdAt" },
    };
    const monthGroupId = {
      month: { $month: "$createdAt" },
      year: { $year: "$createdAt" },
    };

    // 3. TẠO CÁC PIPELINE AGGREGATE
    const createRevenuePipeline = (startDate, groupId) => [
      {
        $match: {
          createdAt: { $gte: startDate },
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: groupId,
          totalRevenue: { $sum: "$totalPrice" },
          totalDiscount: { $sum: "$discountAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1, "_id.day": 1 } },
    ];

    const createProductPipeline = (startDate, groupId) => [
      // Lưu ý: Đổi "cancelled" thành "Cancelled" để khớp với Enum của bạn
      {
        $match: {
          createdAt: { $gte: startDate },
          status: { $ne: "Cancelled" },
        },
      },

      // === DÒNG ĐÃ SỬA ===
      // Đổi từ "$items" thành "$orderItems"
      { $unwind: "$orderItems" },

      {
        $group: {
          _id: groupId,
          // === DÒNG ĐÃ SỬA ===
          // Đổi từ "$items.quantity" thành "$orderItems.quantity"
          totalQuantity: { $sum: "$orderItems.quantity" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1, "_id.day": 1 } },
    ];

    // 4. THỰC THI TẤT CẢ PIPELINE SONG SONG
    const [
      revenueByDay,
      revenueByWeek,
      revenueByMonth,
      productsByDay,
      productsByWeek,
      productsByMonth,
    ] = await Promise.all([
      Order.aggregate(createRevenuePipeline(last7Days, dayGroupId)),
      Order.aggregate(createRevenuePipeline(last6Weeks, weekGroupId)),
      Order.aggregate(createRevenuePipeline(last6Months, monthGroupId)),
      Order.aggregate(createProductPipeline(last7Days, dayGroupId)),
      Order.aggregate(createProductPipeline(last6Weeks, weekGroupId)),
      Order.aggregate(createProductPipeline(last6Months, monthGroupId)),
    ]);

    // 5. ĐỊNH DẠNG DỮ LIỆU TRẢ VỀ CHO BIỂU ĐỒ
    const revenueKeys = [
      { keyInDb: "totalRevenue", keyInChart: "doanhThu" },
      { keyInDb: "totalDiscount", keyInChart: "discount" },
    ];
    const productKeys = [{ keyInDb: "totalQuantity", keyInChart: "soLuong" }];

    const formattedRevenueByDay = formatChartData(
      revenueByDay,
      7,
      "day",
      revenueKeys
    );
    const formattedRevenueByWeek = formatChartData(
      revenueByWeek,
      6,
      "week",
      revenueKeys
    );
    const formattedRevenueByMonth = formatChartData(
      revenueByMonth,
      6,
      "month",
      revenueKeys
    );
    const formattedProductsByDay = formatChartData(
      productsByDay,
      7,
      "day",
      productKeys
    );
    const formattedProductsByWeek = formatChartData(
      productsByWeek,
      6,
      "week",
      productKeys
    );
    const formattedProductsByMonth = formatChartData(
      productsByMonth,
      6,
      "month",
      productKeys
    );

    // 6. TRẢ VỀ KẾT QUẢ CUỐI CÙNG
    res.json({
      // Dữ liệu tổng quan
      totalUsers,
      totalOrders,
      totalRevenue,
      totalDiscount,
      totalProducts,
      // Dữ liệu cho tất cả các biểu đồ
      chartData: {
        byDay: formattedRevenueByDay,
        byWeek: formattedRevenueByWeek,
        byMonth: formattedRevenueByMonth,
        productsByDay: formattedProductsByDay,
        productsByWeek: formattedProductsByWeek,
        productsByMonth: formattedProductsByMonth,
      },
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Lỗi server khi lấy thống kê" });
  }
};
