const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy giỏ hàng", error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, name, price, image, color, storage, quantity } =
      req.body;
    if (!productId || !name || !price || !color || !storage) {
      return res.status(400).json({ message: "Thiếu thông tin sản phẩm" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.storage === storage
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        productId,
        name,
        price,
        image,
        color,
        storage,
        quantity: quantity || 1,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi thêm vào giỏ hàng", error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId, color, storage, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    const item = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.storage === storage
    );

    if (item) {
      item.quantity = Math.max(1, quantity);
      await cart.save();
      res.json(cart);
    } else {
      res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi cập nhật giỏ hàng", error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId, color, storage } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    cart.items = cart.items.filter(
      (item) =>
        item.productId.toString() !== productId ||
        item.color !== color ||
        item.storage !== storage
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi xóa sản phẩm khỏi giỏ", error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Đã xóa toàn bộ giỏ hàng" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa giỏ hàng", error: err.message });
  }
};
const removeMultipleItemsFromCart = async (req, res) => {
  try {
    const items = req.body.items;
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Danh sách sản phẩm không hợp lệ" });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });

    cart.items = cart.items.filter((item) => {
      if (!item.product) return true;
      return !items.some(
        (rm) =>
          rm.productId === item.product.toString() &&
          rm.color === item.color &&
          rm.storage === item.storage
      );
    });

    await cart.save();

    // Trả về giỏ hàng mới
    res.json({
      message: "Đã xóa các sản phẩm được chọn",
      cartItems: cart.items,
    });
  } catch (err) {
    console.error("Lỗi khi xóa nhiều sản phẩm khỏi giỏ hàng:", err);
    res.status(500).json({
      message: "Lỗi khi xóa nhiều sản phẩm khỏi giỏ hàng",
      error: err.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  removeMultipleItemsFromCart,
};
