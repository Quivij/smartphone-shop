// controllers/couponController.js
const Coupon = require("../models/Coupon");

exports.createCoupon = async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.validateCoupon = async (req, res) => {
  try {
    const { code, orderTotal } = req.body;

    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon)
      return res.status(404).json({ message: "Mã không tồn tại hoặc hết hạn" });

    if (new Date(coupon.expireDate) < Date.now())
      return res.status(400).json({ message: "Mã đã hết hạn" });

    if (orderTotal < coupon.minOrderValue)
      return res
        .status(400)
        .json({ message: `Đơn hàng phải từ ${coupon.minOrderValue}đ` });

    res.status(200).json({ valid: true, coupon });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
};

exports.deleteCouponById = async (req, res) => {
  const deleted = await Coupon.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Không tìm thấy mã" });
  res.json({ message: "Đã xóa mã khuyến mãi" });
};
