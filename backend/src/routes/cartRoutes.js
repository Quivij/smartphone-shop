const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Get user's cart
router.get('/', getCart);

// Add item to cart
router.post('/add', addToCart);

// Update cart item quantity
router.put('/item/:id', updateCartItem);

// Remove item from cart
router.delete('/item/:id', removeFromCart);

// Clear cart
router.delete('/clear', clearCart);

module.exports = router;
