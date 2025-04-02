const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người đặt hàng
    orderItems: [
      {
        name: { type: String, required: true }, // Tên sản phẩm
        amount: { type: Number, required: true }, // Số lượng
        image: { type: String, required: true }, // Ảnh sản phẩm
        price: { type: Number, required: true }, // Giá
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }, // Tham chiếu đến bảng Product
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true } // Tự động tạo `createdAt` và `updatedAt`
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
