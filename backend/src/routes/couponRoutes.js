const express = require("express");
const {
  createCoupon,
  validateCoupon,
  getAllCoupons,
  deleteCouponById,
} = require("../controllers/couponController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin tạo mã khuyến mãi
router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);
router.delete("/:id", authMiddleware, isAdmin, deleteCouponById);

// Khách hàng kiểm tra mã
router.post("/validate", validateCoupon);

module.exports = router;
