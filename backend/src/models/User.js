const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: { type: String, default: "" },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: { type: Boolean, default: false },
    address: { type: String, default: "" }, // ✅ Thêm address
    phone: { type: String, default: "" }, // ✅ Thêm phone
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
