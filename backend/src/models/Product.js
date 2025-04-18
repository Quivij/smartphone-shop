const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    brand: { type: String, required: true },

    // ✅ Biến thể theo màu sắc
    variants: [
      {
        color: { type: String, required: true },
        images: [{ type: String, required: true }],
        stock: { type: Number, default: 0, min: 0 },
      },
    ],

    specifications: {
      screen: { type: String },
      os: { type: String },
      cpu: { type: String },
      ram: { type: String },
      storage: { type: String },
      battery: { type: String },
      camera: { type: String },
    },

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
