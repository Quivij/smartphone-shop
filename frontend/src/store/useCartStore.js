import { create } from "zustand";
import { persist } from "zustand/middleware";
import cartApi from '../api/cartApi';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      isLoading: false,
      error: null,

      syncCartWithBackend: async () => {
        try {
          set({ isLoading: true, error: null });
          const cart = await cartApi.getCart();
          set({ cartItems: cart.items || [], isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      addToCart: async (product, variant) => {
        try {
          set({ isLoading: true, error: null });
          const response = await cartApi.addToCart(
            product._id,
            variant.storage,
            1
          );
          set({ cartItems: response.items || [], isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      removeFromCart: async (itemId) => {
        try {
          set({ isLoading: true, error: null });
          const response = await cartApi.removeFromCart(itemId);
          set({ cartItems: response.items || [], isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      updateCartItem: async (itemId, quantity) => {
        try {
          set({ isLoading: true, error: null });
          const response = await cartApi.updateCartItem(itemId, quantity);
          set({ cartItems: response.items || [], isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      updateQuantity: async (productId, storage, quantity) => {
        try {
          set({ isLoading: true, error: null });
          const response = await cartApi.updateQuantity(productId, storage, quantity);
          set({ cartItems: response.items || [], isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      fetchCart: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await cartApi.getCart();
          set({ cartItems: response.items || [], isLoading: false });
          return response;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      getCartCount: () => {
        const cartItems = get().cartItems;
        return cartItems
          ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
          : 0;
      },

      clearCart: () => {
        set({ cartItems: [], error: null });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
