"use strict";

var mongoose = require("mongoose");
var cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  color: {
    type: String,
    required: true
  },
  storage: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    "default": 1
  }
});
var cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [cartItemSchema]
}, {
  timestamps: true
});
var Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;