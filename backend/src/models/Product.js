const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    brand: { type: String, required: true },

    // Biến thể sản phẩm (màu sắc, ảnh, tồn kho)
    variants: [
      {
        color: { type: String, required: true },
        images: [{ type: String, required: true }],
        stock: { type: Number, default: 0, min: 0 },
      },
    ],

    // Thông số kỹ thuật
    specifications: {
      screen: { type: String, required: true, default: "" },
      os: { type: String, required: true, default: "" },
      cpu: { type: String, required: true, default: "" },
      ram: { type: String, required: true, default: "" },
      storage: { type: String, required: true, default: "" },
      battery: { type: String, required: true, default: "" },
      camera: { type: String, required: true, default: "" },
    },

    // Đánh giá
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    sold: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
