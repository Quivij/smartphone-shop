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
  ResponsiveContainer,
} from "recharts";
import { Card } from "../../components/card";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";

// 👉 Token giả lập (thay bằng token thực tế từ context/auth)
const fakeToken = "your-jwt-token-here";

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardStats(fakeToken);
  const navigate = useNavigate();

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
      title: "Doanh thu",
      value: `$${data?.totalRevenue?.toLocaleString() ?? "0"}`,
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
              <BarChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="doanhThu"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
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
