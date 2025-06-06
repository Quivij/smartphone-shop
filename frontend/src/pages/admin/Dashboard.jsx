import React from "react";
import { useNavigate } from "react-router-dom";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../../components/card";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";

const fakeToken = "your-jwt-token-here";

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardStats(fakeToken);
  const navigate = useNavigate();
  const chartDataWithDiscount =
    data?.chartData?.map((item) => ({
      ...item,
      doanhThuDaGiam: item.doanhThu - (item.discount || 0),
    })) ?? [];

  const stats = [
    {
      title: "Người dùng",
      value: data?.totalUsers ?? 0,
      icon: <Users className="text-blue-600" />,
      bg: "bg-blue-100",
      path: "/admin/users",
    },
    {
      title: "Đơn hàng",
      value: data?.totalOrders ?? 0,
      icon: <ShoppingCart className="text-green-600" />,
      bg: "bg-green-100",
      path: "/admin/orders",
    },
    {
      title: "Doanh thu thực tế",
      value: (
        <div className="text-gray-800 font-bold text-lg">
          <div>
            <span className="mr-2">Chưa giảm giá:</span>
            <span>{(data?.totalRevenue ?? 0).toLocaleString("vi-VN")}₫</span>
          </div>
          <div>
            <span className="mr-2">Đã giảm giá:</span>
            <span>
              {(
                (data?.totalRevenue ?? 0) - (data?.totalDiscount ?? 0)
              ).toLocaleString("vi-VN")}
              ₫
            </span>
          </div>
        </div>
      ),
      icon: <DollarSign className="text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Sản phẩm",
      value: data?.totalProducts ?? 0,
      icon: <Package className="text-purple-600" />,
      bg: "bg-purple-100",
      path: "/admin/products",
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800">
        📊 Dashboard Quản Trị
      </h1>

      {isLoading ? (
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      ) : isError ? (
        <p className="text-red-500">Không thể tải dữ liệu thống kê.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => (
              <Card
                key={index}
                onClick={() => item.path && navigate(item.path)}
                className={`cursor-pointer p-5 rounded-2xl shadow-md flex items-center gap-4 hover:shadow-lg transition ${item.bg}`}
              >
                <div className="p-3 bg-white rounded-full shadow">
                  <div className="text-3xl">{item.icon}</div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{item.title}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {item.value}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 mt-8 rounded-2xl shadow-md bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📈 Doanh thu 6 tháng gần nhất
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartDataWithDiscount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => {
                    if (value >= 1_000_000) return `${value / 1_000_000}tr₫`;
                    if (value >= 1_000) return `${value / 1_000}k₫`;
                    return value + "₫";
                  }}
                  width={80}
                />

                <Tooltip
                  formatter={(value) => `${value.toLocaleString("vi-VN")}₫`}
                />
                <Legend />
                {/* Doanh thu chưa giảm */}
                <Bar
                  dataKey="doanhThu"
                  name="Doanh thu chưa giảm giá"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                {/* Doanh thu đã giảm */}
                <Bar
                  dataKey="doanhThuDaGiam"
                  name="Doanh thu đã giảm giá"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;
