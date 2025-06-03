const express = require("express");
const {
  createCoupon,
  validateCoupon,
  getAllCoupons,
  deleteCouponById,
} = require("../controllers/couponController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/validate", validateCoupon);

// Admin tạo mã khuyến mãi
router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);
router.delete("/:id", authMiddleware, isAdmin, deleteCouponById);

// Khách hàng kiểm tra mã

module.exports = router;
