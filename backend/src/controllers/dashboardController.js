import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Tổng số liệu
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Tổng doanh thu chưa trừ giảm giá
    const totalRevenueAgg = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // Tổng giảm giá
    const totalDiscountAgg = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, totalDiscount: { $sum: "$discountAmount" } } },
    ]);
    const totalDiscount = totalDiscountAgg[0]?.totalDiscount || 0;

    const totalProducts = await Product.countDocuments();

    // Doanh thu và giảm giá theo tháng (6 tháng gần nhất)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5); // 5 tháng trước + tháng hiện tại = 6 tháng

    const revenueByMonth = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalPrice" },
          totalDiscount: { $sum: "$discountAmount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const monthsMap = [
      "",
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    // Đảm bảo đủ 6 tháng liên tiếp (có thể có tháng không có doanh thu => fill 0)
    const now = new Date();
    const chartData = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const found = revenueByMonth.find(
        (item) => item._id.month === month && item._id.year === year
      );

      chartData.push({
        name: monthsMap[month],
        doanhThu: found ? found.totalRevenue : 0,
        discount: found ? found.totalDiscount : 0,
      });
    }

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      totalDiscount,
      totalProducts,
      chartData,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Lỗi server khi lấy thống kê" });
  }
};
