// import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderDetail } from "../hooks/useOrderDetail";
import { format } from "date-fns";
import { toast } from "react-toastify";
import api from "../api/api";
import React, { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Rất tệ',
  1: 'Tệ',
  1.5: 'Kém',
  2: 'Không hài lòng',
  2.5: 'Bình thường',
  3: 'Tạm ổn',
  3.5: 'Khá',
  4: 'Tốt',
  4.5: 'Rất tốt',
  5: 'Xuất sắc',
};
function getLabelText(value) {
  return `${value} Sao, ${labels[value]}`;
}
const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useOrderDetail(id);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error("Lỗi khi tải thông tin đơn hàng");
      navigate("/orders/my");
    }
  }, [isError, navigate]);

  if (isLoading) return <div className="text-center py-4">Đang tải...</div>;
  if (!order) return null;

  const handleCancelOrder = async () => {
    try {
      const { data } = await api.patch(`/orders/cancel/${id}`);

      toast.success(data.message || "Đơn hàng đã được hủy");
      navigate("/orders/my");
    } catch (err) {
      console.error("Lỗi khi hủy đơn hàng:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Không thể hủy đơn hàng";
      toast.error(errorMessage);
    }
  };

  const handleSubmitRating = async (productId) => {
    if (!value || value <= 0) return;
    setIsSubmitting(true);
    try {
      await api.post(`/products/${productId}/rating`, { rating: value });
      toast.success('Đánh giá thành công!');
    } catch (err) {
      toast.error('Gửi đánh giá thất bại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Chi tiết đơn hàng #{order._id.slice(-6).toUpperCase()}
      </h2>

      {/* Trạng thái đơn hàng */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
        <div className="p-4 border rounded-md bg-gray-50">
          <div className="font-semibold text-gray-700 mb-1">
            Trạng thái giao hàng
          </div>
          <p
            className={`font-medium ${
              order.status === "Cancelled"
                ? "text-gray-500"
                : order.isDelivered
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {order.status === "Cancelled"
              ? "Đã hủy"
              : order.isDelivered
              ? "Đã giao hàng"
              : "Chưa giao hàng"}
          </p>
        </div>

        <div className="p-4 border rounded-md bg-gray-50">
          <div className="font-semibold text-gray-700 mb-1">
            Trạng thái thanh toán
          </div>
          <p
            className={`font-medium ${
              order.status === "Cancelled"
                ? "text-gray-500"
                : order.paymentStatus === "paid"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {order.status === "Cancelled"
              ? "Đã hủy"
              : order.paymentStatus === "paid"
              ? "Đã thanh toán"
              : "Chưa thanh toán"}
          </p>
        </div>

        <div className="p-4 border rounded-md bg-gray-50">
          <div className="font-semibold text-gray-700 mb-1">Ngày tạo</div>
          <p className="font-medium text-gray-600">
            {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
          </p>
        </div>
      </div>

      {/* Thông tin giao hàng */}
      <div className="mb-6">
        <div className="font-bold text-lg mb-2">Thông tin giao hàng</div>
        <div className="space-y-2 text-sm text-gray-700">
          <p>Họ tên: {order.shippingAddress.fullName}</p>
          <p>Số điện thoại: {order.shippingAddress.phone}</p>
          <p>Địa chỉ: {order.shippingAddress.address}</p>
          <p>Thành phố: {order.shippingAddress.city}</p>
          <p>Quận/Huyện: {order.shippingAddress.district}</p>
          <p>Xã/Phường: {order.shippingAddress.ward}</p>
        </div>
      </div>

      {/* Phương thức thanh toán */}
      <div className="mb-6">
        <div className="font-bold text-lg mb-2">Phương thức thanh toán</div>
        <p className="text-sm text-gray-700">{order.paymentMethod}</p>
      </div>

      {/* Chi tiết sản phẩm */}
      <div className="mb-6">
        <div className="font-bold text-lg mb-2">Chi tiết sản phẩm</div>
        {order.orderItems.map((item) => (
          <div
            key={item._id}
            className="border p-4 mb-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex items-center mb-2">
              {/* Thay hình ảnh bằng tên sản phẩm */}
              <div className="ml-4 flex-1">
                <div className="font-semibold text-lg">
                  {item.product?.name || "Sản phẩm"}
                </div>
                <div className="text-sm text-gray-600">
                  Màu: {item.color} | Dung lượng: {item.storage}
                </div>
              </div>
              <div className="text-sm font-medium">x{item.quantity}</div>
            </div>
            <div className="text-sm text-gray-600">
              Giá: {item.price.toLocaleString()}₫ | Tổng:{" "}
              {(item.price * item.quantity).toLocaleString()}₫
            </div>
            {/* Đánh giá sản phẩm */}
            <div className="mt-2 flex items-center gap-2">
              <Rating
                name={`hover-feedback-${item._id}`}
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
              <button
                className={`ml-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => handleSubmitRating(item.product?._id)}
                disabled={isSubmitting || !value || value <= 0}
              >
                {isSubmitting ? 'Đang gửi...' : 'Đánh giá'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tổng tiền và giảm giá */}
      <div className="text-right font-semibold text-xl mb-6 space-y-1">
        {order.discountAmount > 0 && (
          <div className="text-green-600 text-lg">
            Giảm giá: -{order.discountAmount.toLocaleString()}₫
          </div>
        )}
        <div className="text-2xl text-blue-700">
          Tổng thanh toán:{" "}
          {(order.finalPrice ?? order.totalPrice).toLocaleString()}₫
        </div>
      </div>

      {/* Nút hủy đơn hàng */}
      {!order.isDelivered && order.status !== "Cancelled" && (
        <div className="mt-6 text-center">
          <button
            onClick={handleCancelOrder}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
          >
            Hủy đơn hàng
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
