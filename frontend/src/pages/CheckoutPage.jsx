import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useValidateCoupon } from "../hooks/useValidateCoupon";
import { toast } from "react-toastify";

const formatCurrency = (value) => {
  if (isNaN(value)) return "0₫";
  return value.toLocaleString("vi-VN") + "₫";
};
const CheckoutPage = () => {
  const { cartItems, clearCart, fetchCart, isLoading: cartLoading } = useCartStore();
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

  useEffect(() => {
    const loadCart = async () => {
      try {
        await fetchCart();
      } catch (error) {
        toast.error("Không thể tải giỏ hàng. Vui lòng thử lại.");
        navigate("/cart");
      }
    };
    loadCart();
  }, [fetchCart, navigate]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.variant.price) * Number(item.quantity)),
    0
  );
  // Thêm Math.max để đảm bảo không âm
  const finalPrice = Math.max(0, totalPrice - discountAmount);  

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

    if (!totalPrice || totalPrice <= 0) {
      return toast.error("Tổng đơn hàng không hợp lệ");
    }

    validateCoupon(
      { code: couponCode.trim().toUpperCase(), orderTotal: totalPrice },
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
              `Giảm ${coupon.discountValue}% (${formatCurrency(discount)})`
            );
          } else if (coupon.discountType === "amount") {
            setDiscountAmount(coupon.discountValue);
            toast.success(`Giảm ${formatCurrency(coupon.discountValue)}`);
          } else {
            setDiscountAmount(0);
            toast.error("Loại giảm giá không xác định");
          }
        },
        onError: (err) => {
          setDiscountAmount(0);
          toast.error(
            err?.message || "Mã không hợp lệ hoặc đã hết hạn"
          );
        },
      }
    );
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      return toast.error("Giỏ hàng trống");
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item.product._id,
        color: item.variant.color,
        storage: item.variant.storage,
        quantity: item.quantity,
        price: item.variant.price,
      })),
      shippingAddress: shippingInfo,
      paymentMethod,
      totalPrice,
      discountAmount,
      finalPrice,
      couponCode: couponCode.trim(),
    };
    console.log("Cart items:", cartItems);
    console.log("Order data:", orderData);
    console.log("Total price:", totalPrice);
    console.log("Discount amount:", discountAmount);
    console.log("Final price:", finalPrice);

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

  if (cartLoading) {
    return <div className="flex justify-center items-center min-h-screen">Đang tải...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl mb-4">Giỏ hàng trống</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

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
          required
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
        Tổng tiền: <span className="font-medium">{formatCurrency(totalPrice)}</span>
      </div>

      {discountAmount > 0 && (
        <div className="text-green-600 mb-2">
         Giảm giá: -{formatCurrency(discountAmount)}
        </div>
      )}

      <div className="font-bold text-xl mb-4">
        Thanh toán: {formatCurrency(finalPrice)}
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