const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },

    variants: [
      {
        color: { type: String, required: true },
        storage: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        images: [{ type: String, required: true }],
        stock: { type: Number, default: 0, min: 0 },
        sold: { type: Number, default: 0, min: 0 }, // ✅ đã thêm
      },
    ],

    specifications: {
      screen: { type: String, default: "" },
      os: { type: String, default: "" },
      cpu: { type: String, default: "" },
      ram: { type: String, default: "" },
      battery: { type: String, default: "" },
      camera: { type: String, default: "" },
    },

    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    sold: { type: Number, default: 0 }, // tổng số đã bán (có thể dùng nếu cần)
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
