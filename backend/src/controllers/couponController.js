// controllers/couponController.js
const couponService = require("../services/couponService");

exports.createCoupon = async (req, res) => {
  try {
    const newCoupon = await couponService.createCoupon(req.body);
    res.status(201).json(newCoupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    const coupon = await couponService.validateCoupon(code, orderTotal);
    res.status(200).json({ valid: true, coupon });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await couponService.getAllCoupons();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCouponById = async (req, res) => {
  try {
    await couponService.deleteCouponById(req.params.id);
    res.json({ message: "Đã xóa mã khuyến mãi" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
