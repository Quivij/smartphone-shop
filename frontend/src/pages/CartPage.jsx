import React, { useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { TiShoppingCart } from "react-icons/ti";

const CartPage = () => {
  const { cartItems, isLoading, error, fetchCart, updateQuantity, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const calculateTotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((total, item) => {
      return total + (item.variant.price * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/products" className="text-blue-500 hover:text-blue-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (productId, storage, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(productId, storage, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const total = calculateTotal();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        <TiShoppingCart className='text-4xl text-blue-600' />
        GIỎ HÀNG
        </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4 mb-4 p-4 border rounded-lg">
              <img
                src={item.product?.images?.[0] || 'default-image-url.jpg'}
                alt={item.product?.name || 'Product name'}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.product?.name}</h3>
                <p className="text-gray-600">
                  {item.variant.color} - {item.variant.storage}
                </p>
                <p className="text-gray-800 font-medium">
                  ${item.variant.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.variant.storage, item.quantity - 1)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.product._id, item.variant.storage, item.quantity + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Tổng Đơn Hàng</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tổng</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Giao hàng</span>
                <span>Miễn phí</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
