"use strict";

// models/Coupon.js
var mongoose = require("mongoose");
var couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountType: {
    type: String,
    "enum": ["percent", "amount"],
    required: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  minOrderValue: {
    type: Number,
    "default": 0
  },
  expireDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    "default": true
  }
});
module.exports = mongoose.model("Coupon", couponSchema);