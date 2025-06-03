const CartItem = require('../models/cartitem');

class CartService {
  async findCartItemById(id) {
    const item = await CartItem.findById(id).populate('cart');
    if (!item) {
      throw new Error('CANT_FIND_CARTITEM', 404);
    }
    return item;
  }
  async addCartItem(userId, productId, storage, quantity) {
  const cart = await this.findUserCart(userId);

  if (!cart) {
    // Tạo cart mới nếu chưa có
    const newCart = new Cart({ user: userId, cartItems: [] });
    await newCart.save();
    return this.addCartItem(userId, productId, storage, quantity); // gọi lại
  }

  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');

  let existingItem = cart.cartItems.find(
    (item) => item.product.toString() === productId && item.storage === storage
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    await existingItem.save();
  } else {
    const newItem = new CartItem({
      product: productId,
      storage,
      quantity,
    });
    await newItem.save();

    cart.cartItems.push(newItem);
    await cart.save();
  }

  return this.findUserCart(userId); // Đảm bảo hàm này có populate
}
  // async addCartItem(userId, productId, storage, quantity) {
  //     const cart = await this.findUserCart(userId);
  
  //     const product = await Product.findById(productId);
  //     if (!product) throw new Error('Product not found');
  
  //     // Kiểm tra xem sản phẩm đã có trong giỏ chưa
  //     let existingItem = cart.cartItems.find(
  //       (item) => item.product.toString() === productId && item.storage === storage
  //     );
  
  //     if (existingItem) {
  //       // Cập nhật số lượng nếu đã tồn tại
  //       existingItem.quantity += quantity;
  //       await existingItem.save();
  //     } else {
  //       // Tạo item mới nếu chưa có
  //       const newItem = new CartItem({
  //         product: productId,
  //         storage,
  //         quantity,
  //       });
  //       await newItem.save();
  
  //       cart.cartItems.push(newItem);
  //       await cart.save();
  //     }
  
  //     return await this.findUserCart(userId);
  //   }
  async updateCartItemQuantity(userId, productId, storage, quantity) {
    const cart = await this.findUserCart(userId);
    if (!cart) throw new Error('Cart not found');

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.variant.storage === storage
    );

    if (itemIndex === -1) throw new Error('Item not found in cart');

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    return cart;
  }

  async updateCartItem(userId, cartItemId, updatedItem) {
    const item = await this.findCartItemById(cartItemId);
    await item.populate('product');

    if (String(item.cart.user) !== String(userId)) {
      throw new Error ("User can't update this cartItem", 403);
    }

    item.quantity = updatedItem.quantity;
    item.price = updatedItem.quantity * item.product.price;

    return await item.save();
  }

  async deleteCartItem(userId, cartItemId) {
    const item = await this.findCartItemById(cartItemId);
    if (String(item.cart.user) !== String(userId)) {
      throw new Error("CANT_UPDATE_CART_ITEM", 403);
    }

    return await item.deleteOne();
  }
}

module.exports = new CartService();
