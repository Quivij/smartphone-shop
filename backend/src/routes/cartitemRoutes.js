const express = require('express');
const router = express.Router();
const cartitemController = require('../controllers/cartitemcontroller');

// Lấy giỏ hàng người dùng
router.get('/', cartitemController.getCart);


// Xoá sản phẩm khỏi giỏ hàng
router.delete('/item/:cartItemId', cartitemController.deleteCartItem);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/item/:cartItemId', cartitemController.updateCartItem);

module.exports = router;
