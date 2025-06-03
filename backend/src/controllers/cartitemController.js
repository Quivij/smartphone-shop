const cartitemService = require('../services/cartitemService');
const ProductService = require('../services/productService');
const UserService = require('../services/userService');

  // GET /api/cart
const getCart = async (req, res) => {
    try {
      const user = req.user;
      const cart = await cartitemService.findUserCart(user);
      res.status(200).json(cart);
    } catch (err){
      res.status(400).json({ message: err.message });
    }
};

  // PUT /api/cart/add
const addItemToCart = async (req, res) => {
    try {
      const user = req.user;
      const { productId, size, quantity } = req.body;

      if (!productId || quantity <= 0) {
        throw new Error('Invalid input', 400);
      }

      const product = await ProductService.findProductById(productId);
      const item = await cartitemService.addCartItem(user, product, size, quantity);

      res.status(202).json(item);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // DELETE /api/cart/item/:cartItemId
const deleteCartItem = async (req, res) => {
    try {
      const user = req.user;
      const cartItemId = req.params.cartItemId;

      await CartItemService.deleteCartItem(user.id, cartItemId);
      res.status(202).json({ message: 'Cart item deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // PUT /api/cart/item/:cartItemId
const updateCartItem = async(req, res, next)=> {
    try {
      const user = req.user;
      const cartItemId = req.params.cartItemId;
      const { quantity } = req.body;

      if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than 0' });
      }

      const updatedItem = await CartItemService.updateCartItem(user.id, cartItemId, { quantity });
      res.status(200).json(updatedItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

module.exports = {
  getCart,
  addItemToCart,
  deleteCartItem,
  updateCartItem
};
