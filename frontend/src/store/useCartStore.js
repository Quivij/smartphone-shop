import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, variant) => {
        if (!product || !variant) return;

        const cartItems = get().cartItems;

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
                // Kiểm tra và gán ảnh sản phẩm nếu hợp lệ
                image:
                  variant.images && variant.images.length > 0
                    ? `http://localhost:3001${variant.images[0]}`
                    : "default-image.jpg", // Đặt ảnh mặc định nếu không có ảnh
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
        return cartItems
          ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
          : 0;
      },

      clearCart: () => {
        set({ cartItems: [] });
        localStorage.removeItem("cart-storage"); // Xóa dữ liệu giỏ hàng trong localStorage
      },
    }),
    {
      name: "cart-storage", // Lưu trữ giỏ hàng trong localStorage
    }
  )
);
