"use strict";

var express = require("express");
var _require = require("../controllers/couponController"),
  createCoupon = _require.createCoupon,
  validateCoupon = _require.validateCoupon,
  getAllCoupons = _require.getAllCoupons,
  deleteCouponById = _require.deleteCouponById;
var _require2 = require("../middleware/authMiddleware"),
  authMiddleware = _require2.authMiddleware,
  isAdmin = _require2.isAdmin;
var router = express.Router();

// Public routes - no authentication required
router.post("/validate", validateCoupon);

// Admin routes - require authentication and admin role
router.use(authMiddleware);
router.post("/", isAdmin, createCoupon);
router.get("/", isAdmin, getAllCoupons);
router["delete"]("/:id", isAdmin, deleteCouponById);
module.exports = router;