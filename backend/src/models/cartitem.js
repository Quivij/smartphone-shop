const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: {
    color: String,
    storage: String
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // ← giữ tổng tiền của item = quantity * variant.price
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);