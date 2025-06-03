const Coupon = require("../models/Coupon");

class CouponService {
  async createCoupon(data) {
    const newCoupon = new Coupon(data);
    return await newCoupon.save();
  }

  async validateCoupon(code, orderTotal) {
    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon) throw new Error("Mã không tồn tại hoặc hết hạn");
    if (new Date(coupon.expireDate) < Date.now()) throw new Error("Mã đã hết hạn");
    if (orderTotal < coupon.minOrderValue) throw new Error(`Đơn hàng phải từ ${coupon.minOrderValue}đ`);
    return coupon;
  }

  async getAllCoupons() {
    return await Coupon.find();
  }

  async deleteCouponById(id) {
    const deleted = await Coupon.findByIdAndDelete(id);
    if (!deleted) throw new Error("Không tìm thấy mã");
    return deleted;
  }
}

module.exports = new CouponService(); 