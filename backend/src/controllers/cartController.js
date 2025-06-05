const cartService = require("../services/cartService");

const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy giỏ hàng", error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const cart = await cartService.addToCart(req.user.id, req.body);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi thêm vào giỏ hàng", error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const cart = await cartService.updateCartItem(req.user.id, req.body);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật giỏ hàng", error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await cartService.removeFromCart(req.user.id, req.body);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi xóa sản phẩm khỏi giỏ", error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const result = await cartService.clearCart(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa giỏ hàng", error: err.message });
  }
};

const removeMultipleItemsFromCart = async (req, res) => {
  try {
    const result = await cartService.removeMultipleItemsFromCart(req.user.id, req.body.items);
    res.json(result);
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
