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
<<<<<<< HEAD
    const { code, orderTotal } = req.body;
    const coupon = await couponService.validateCoupon(code, orderTotal);
    res.status(200).json({ valid: true, coupon });
=======
    const code = req.query.code?.toLowerCase();

    if (!code) return res.status(400).json({ message: "Thiếu mã giảm giá" });

    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon)
      return res.status(404).json({ message: "Mã không tồn tại hoặc hết hạn" });

    if (new Date(coupon.expireDate) < Date.now())
      return res.status(400).json({ message: "Mã đã hết hạn" });

    res.status(200).json({
      valid: true,
      type: coupon.discountType,
      value: coupon.discountValue,
      coupon,
    });
>>>>>>> 37d8ccaa738ad31a72490cb942aaa131afe07ee2
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
<<<<<<< HEAD
=======

exports.getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
};
>>>>>>> 37d8ccaa738ad31a72490cb942aaa131afe07ee2

exports.deleteCouponById = async (req, res) => {
  try {
    await couponService.deleteCouponById(req.params.id);
    res.json({ message: "Đã xóa mã khuyến mãi" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
