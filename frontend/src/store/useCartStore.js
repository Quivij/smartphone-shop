import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tiện ích nhỏ kiểm tra đăng nhập
// const isLoggedIn = () => {
//   return !!localStorage.getItem("token");
// };

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, variant) => {
        if (!product || !variant) return;

        const cartItems = Array.isArray(get().cartItems) ? get().cartItems : [];

        const existingIndex = cartItems.findIndex(
          (item) =>
            item.productId === product._id &&
            item.color === variant.color &&
            item.storage === variant.storage
        );

        if (existingIndex !== -1) {
          const updatedItems = [...cartItems];
          updatedItems[existingIndex].quantity += 1;
          set({ cartItems: updatedItems });
        } else {
          set({
            cartItems: [
              ...cartItems,
              {
                productId: product._id,
                name: product.name,
                price: variant.price,
                image: `http://localhost:3001${variant.images[0]}`,
                color: variant.color,
                storage: variant.storage,
                quantity: 1,
              },
            ],
          });
        }
      },

      removeFromCart: (productId, color, storage) => {
        const cartItems = get().cartItems;
        const updatedItems = cartItems.filter(
          (item) =>
            item.productId !== productId ||
            item.color !== color ||
            item.storage !== storage
        );
        set({ cartItems: updatedItems });
      },

      updateQuantity: (productId, color, storage, quantity) => {
        const cartItems = get().cartItems;
        const updatedItems = cartItems.map((item) => {
          if (
            item.productId === productId &&
            item.color === color &&
            item.storage === storage
          ) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });

        set({ cartItems: updatedItems });
      },

      getCartCount: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },
      clearCart: () => set({ cartItems: [] }),

      // Loại bỏ các hàm đồng bộ với backend
      // syncCartWithBackend: async () => {
      //   if (!isLoggedIn()) {
      //     console.warn("Chưa đăng nhập, không thể đồng bộ giỏ hàng từ server.");
      //     return;
      //   }
      //   ...
      // },

      // syncCartToBackend: async () => {
      //   if (!isLoggedIn()) {
      //     console.warn("Chưa đăng nhập, không thể đồng bộ giỏ hàng lên server.");
      //     return;
      //   }
      //   ...
      // },

      // checkoutCart: async () => {
      //   if (!isLoggedIn()) {
      //     console.warn("Chưa đăng nhập, không thể thanh toán.");
      //     return;
      //   }
      //   ...
      // },
    }),
    {
      name: "cart-storage", // lưu localStorage
    }
  )
);
