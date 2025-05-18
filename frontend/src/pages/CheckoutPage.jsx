import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const { mutate: createOrder, isPending } = useCreateOrder();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = () => {
    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item.productId,
        color: item.color,
        storage: item.storage,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: shippingInfo,
      paymentMethod,
      totalPrice,
    };

    const toastId = toast.loading("Đang xử lý đơn hàng...");

    createOrder(orderData, {
      onSuccess: () => {
        clearCart();
        toast.update(toastId, {
          render: "Đặt hàng thành công!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate("/orders/my");
      },
      onError: (err) => {
        toast.update(toastId, {
          render:
            err?.response?.data?.message || "Lỗi đặt hàng, vui lòng thử lại.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>

      {[
        { name: "fullName", placeholder: "Họ và tên" },
        { name: "phone", placeholder: "Số điện thoại" },
        { name: "address", placeholder: "Địa chỉ" },
        { name: "city", placeholder: "Thành phố" },
        { name: "district", placeholder: "Quận/Huyện" },
        { name: "ward", placeholder: "Phường/Xã" },
      ].map(({ name, placeholder }) => (
        <input
          key={name}
          name={name}
          placeholder={placeholder}
          value={shippingInfo[name]}
          onChange={handleInputChange}
          className="w-full border p-2 mb-2"
        />
      ))}

      <div className="mb-4">
        <label className="font-medium">Phương thức thanh toán:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="block w-full border p-2 mt-1"
        >
          <option value="COD">Thanh toán khi nhận hàng</option>
          <option value="Momo">Momo</option>
          <option value="BankTransfer">Chuyển khoản</option>
        </select>
      </div>

      <div className="font-bold text-lg mb-4">
        Tổng tiền: {totalPrice.toLocaleString()}₫
      </div>

      <button
        onClick={handleOrder}
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Đang xử lý..." : "Đặt hàng"}
      </button>
    </div>
  );
};

export default CheckoutPage;
