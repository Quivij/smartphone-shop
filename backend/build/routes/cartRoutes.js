"use strict";

var express = require("express");
var _require = require("../controllers/cartController"),
  getCart = _require.getCart,
  addToCart = _require.addToCart,
  updateCartItem = _require.updateCartItem,
  removeFromCart = _require.removeFromCart,
  clearCart = _require.clearCart,
  removeMultipleItemsFromCart = _require.removeMultipleItemsFromCart;
var _require2 = require("../middleware/authMiddleware"),
  authMiddleware = _require2.authMiddleware;
var router = express.Router();

// GET /api/cart - lấy giỏ hàng người dùng
router.get("/", authMiddleware, getCart);

// POST /api/cart - thêm sản phẩm vào giỏ
router.post("/", authMiddleware, addToCart);

// PUT /api/cart - cập nhật số lượng
router.put("/update", authMiddleware, updateCartItem);

// DELETE /api/cart - xóa sản phẩm khỏi giỏ
router["delete"]("/remove", authMiddleware, removeFromCart);

// DELETE /api/cart/all - xóa toàn bộ giỏ hàng
router["delete"]("/clear", authMiddleware, clearCart);
router["delete"]("/remove-multiple", authMiddleware, removeMultipleItemsFromCart);
module.exports = router;