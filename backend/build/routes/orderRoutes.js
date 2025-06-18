"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/orderController"),
  createOrder = _require.createOrder,
  getMyOrders = _require.getMyOrders,
  getAllOrders = _require.getAllOrders,
  getOrderById = _require.getOrderById,
  markAsDelivered = _require.markAsDelivered,
  markAsPaid = _require.markAsPaid,
  cancelOrder = _require.cancelOrder;
var _require2 = require("../middleware/authMiddleware"),
  authMiddleware = _require2.authMiddleware,
  isAdmin = _require2.isAdmin;
router.post("/", authMiddleware, createOrder);
router.get("/my", authMiddleware, getMyOrders);
router.get("/", authMiddleware, isAdmin, getAllOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id/deliver", authMiddleware, isAdmin, markAsDelivered);
router.put("/:id/pay", authMiddleware, markAsPaid); // người dùng thanh toán hoặc webhook
router.patch("/cancel/:id", authMiddleware, cancelOrder);
// router.get("", authMiddleware, ca);
module.exports = router;