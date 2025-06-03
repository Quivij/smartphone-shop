const Order = require("../models/Order");
const Product = require("../models/Product");

class OrderService {
  async createOrder(orderData, userId) {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = orderData;
    if (!orderItems || orderItems.length === 0) {
      throw new Error("Không có sản phẩm nào trong đơn hàng");
    }
    const newOrder = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
    return await newOrder.save();
  }

  async getMyOrders(userId) {
    return await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("orderItems.product", "name");
  }

  async getAllOrders(filters, pagination) {
    const { page = 1, limit = 10 } = pagination;
    const { isDelivered, paymentStatus } = filters;
    const filter = {};
    if (isDelivered !== undefined) filter.isDelivered = isDelivered === "true";
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    const orders = await Order.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Order.countDocuments(filter);
    return { total, page: Number(page), orders };
  }

  async getOrderById(orderId, userId, isAdmin) {
    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .populate("orderItems.product");
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    const isOwner = order.user._id.toString() === userId;
    if (!isAdmin && !isOwner) {
      throw new Error("Bạn không có quyền truy cập đơn hàng này");
    }
    return order;
  }

  async markAsDelivered(orderId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    if (order.isDelivered) {
      throw new Error("Đơn hàng đã được giao");
    }
    order.isDelivered = true;
    order.deliveredAt = new Date();
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      const variant = product.variants.find(
        v => v.color === item.color && v.storage === item.storage
      );
      if (variant) {
        variant.stock = Math.max(0, variant.stock - item.quantity);
        variant.sold = (variant.sold || 0) + item.quantity;
        product.markModified("variants");
        product.sold = product.variants.reduce(
          (total, v) => total + (v.sold || 0),
          0
        );
        product.markModified("sold");
        await product.save();
      }
    }
    return await order.save();
  }

  async markAsPaid(orderId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    if (order.paymentStatus === "paid") {
      throw new Error("Đơn hàng đã được thanh toán");
    }
    order.paymentStatus = "paid";
    order.paidAt = new Date();
    return await order.save();
  }

  async cancelOrder(orderId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Đơn hàng không tồn tại");
    if (order.status === "Delivered") {
      throw new Error("Không thể hủy đơn hàng đã giao");
    }
    if (order.status === "Cancelled") {
      throw new Error("Đơn hàng đã bị hủy trước đó");
    }
    order.status = "Cancelled";
    return await order.save();
  }
}

module.exports = new OrderService(); 