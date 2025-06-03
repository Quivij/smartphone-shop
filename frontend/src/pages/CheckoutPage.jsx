import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useValidateCoupon } from "../hooks/useValidateCoupon";
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
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const finalPrice = totalPrice - discountAmount;

  const { mutate: createOrder, isPending } = useCreateOrder();
  const { mutate: validateCoupon } = useValidateCoupon();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      return toast.error("Vui lòng nhập mã giảm giá");
    }

    validateCoupon(
      { code: couponCode.trim().toLowerCase(), orderTotal: totalPrice },
      {
        onSuccess: (res) => {
          const coupon = res.coupon;
          if (!coupon) {
            setDiscountAmount(0);
            return toast.error("Mã giảm giá không hợp lệ");
          }

          if (coupon.discountType === "percent") {
            const discount = Math.floor(
              (totalPrice * coupon.discountValue) / 100
            );
            setDiscountAmount(discount);
            toast.success(
              `Giảm ${coupon.discountValue}% (${discount.toLocaleString()}₫)`
            );
          } else if (coupon.discountType === "amount") {
            setDiscountAmount(coupon.discountValue);
            toast.success(`Giảm ${coupon.discountValue.toLocaleString()}₫`);
          } else {
            setDiscountAmount(0);
            toast.error("Loại giảm giá không xác định");
          }
        },
        onError: (err) => {
          setDiscountAmount(0);
          toast.error(
            err?.response?.data?.message || "Mã không hợp lệ hoặc đã hết hạn"
          );
        },
      }
    );
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
      discountAmount,
      finalPrice,
      couponCode: couponCode.trim(),
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

      <div className="mb-4">
        <label className="font-medium">Mã giảm giá:</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Nhập mã giảm giá"
            className="flex-1 border p-2"
          />
          <button
            onClick={applyCoupon}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Áp dụng
          </button>
        </div>
      </div>

      <div className="text-lg mb-2">
        Tổng tiền:{" "}
        <span className="font-medium">{totalPrice.toLocaleString()}₫</span>
      </div>

      {discountAmount > 0 && (
        <div className="text-green-600 mb-2">
          Giảm giá: -{discountAmount.toLocaleString()}₫
        </div>
      )}

      <div className="font-bold text-xl mb-4">
        Thanh toán: {finalPrice.toLocaleString()}₫
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
