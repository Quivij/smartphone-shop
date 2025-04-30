import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore(); // Không sử dụng syncCartWithBackend nữa
  const navigate = useNavigate();

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => {
        if (item.price) {
          return sum + item.price * item.quantity;
        }
        return sum;
      }, 0)
    : 0;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleIncrease = (item) => {
    updateQuantity(item.productId, item.color, item.storage, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(
        item.productId,
        item.color,
        item.storage,
        item.quantity - 1
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🛒 Giỏ hàng của bạn</h1>

      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Giỏ hàng của bạn đang trống.
        </p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center border p-4 rounded-2xl shadow-md gap-6 bg-white"
            >
              <img
                src={item.image || "/default-image.png"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-sm text-gray-600">
                  Màu: {item.color} | Dung lượng: {item.storage}
                </p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                    >
                      −
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-red-500 font-bold">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item.productId, item.color, item.storage)
                }
                className="text-red-500 font-semibold hover:underline"
              >
                Xóa
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Tổng tiền:{" "}
            <span className="text-red-500">{totalPrice.toLocaleString()}₫</span>
          </div>

          <div className="text-right mt-6">
            <button
              onClick={handleCheckout}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold transition duration-200"
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
