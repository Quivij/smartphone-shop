const Order = require("../models/Order");
const Product = require("../models/Product");

// [POST] /api/orders - Tạo đơn hàng mới
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Không có sản phẩm nào trong đơn hàng" });
    }

    const newOrder = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Tạo đơn hàng thất bại", error });
  }
};

// [GET] /api/orders/my - Lấy đơn hàng của người dùng hiện tại
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy đơn hàng của bạn", error });
  }
};

// [GET] /api/orders - Admin: lấy tất cả đơn hàng
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, isDelivered, paymentStatus } = req.query;

    const filter = {};
    if (isDelivered !== undefined) filter.isDelivered = isDelivered === "true";
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    res.json({ total, page: Number(page), orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Không thể lấy danh sách đơn hàng", error });
  }
};

// [GET] /api/orders/:id - Lấy chi tiết đơn hàng
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    const isOwner = order.user._id.toString() === req.user.id;

    if (!req.user.isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền truy cập đơn hàng này" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy chi tiết đơn hàng", error });
  }
};

// [PUT] /api/orders/:id/deliver - Admin cập nhật trạng thái giao hàng
// [PUT] /api/orders/:id/deliver - Admin cập nhật trạng thái giao hàng
const markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    if (order.isDelivered) {
      return res.status(400).json({ message: "Đơn hàng đã được giao" });
    }

    // Đánh dấu là đã giao
    order.isDelivered = true;
    order.deliveredAt = new Date();

    // Cập nhật tồn kho & đã bán cho từng sản phẩm trong đơn hàng
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      const variant = product.variants.find(
        (v) => v.color === item.color && v.storage === item.storage
      );

      if (variant) {
        variant.stock = Math.max(0, variant.stock - item.quantity);
        variant.sold = (variant.sold || 0) + item.quantity;

        product.markModified("variants");

        // ✅ Tính và cập nhật product.sold
        product.sold = product.variants.reduce(
          (total, v) => total + (v.sold || 0),
          0
        );

        product.markModified("sold"); // 👈 Bắt buộc để đảm bảo mongoose lưu

        await product.save();
      }
    }

    await order.save(); // Lưu lại đơn hàng sau khi cập nhật trạng thái
    res.json({ message: "Đã cập nhật trạng thái giao hàng", order });
  } catch (error) {
    console.error("markAsDelivered error:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi cập nhật đơn hàng", error: error.message });
  }
};

// [PUT] /api/orders/:id/pay - Cập nhật trạng thái thanh toán
const markAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Đơn hàng đã được thanh toán" });
    }

    order.paymentStatus = "paid";
    order.paidAt = new Date(); // cần thêm field paidAt nếu muốn

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Không thể cập nhật trạng thái thanh toán", error });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Đơn hàng không tồn tại" });
    }

    if (order.status === "Delivered") {
      return res
        .status(400)
        .json({ success: false, message: "Không thể hủy đơn hàng đã giao" });
    }

    if (order.status === "Cancelled") {
      return res
        .status(400)
        .json({ success: false, message: "Đơn hàng đã bị hủy trước đó" });
    }

    order.status = "Cancelled";
    await order.save();

    return res.json({ success: true, message: "Đơn hàng đã được hủy" });
  } catch (error) {
    console.error("Lỗi khi hủy đơn hàng:", error);
    res
      .status(500)
      .json({ success: false, message: "Có lỗi xảy ra khi hủy đơn hàng" });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  markAsDelivered,
  markAsPaid,
  cancelOrder,
};
