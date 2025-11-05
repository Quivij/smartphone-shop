import api from "../api/api";

import { getAllProducts } from "./product"; // ⚠️ Đảm bảo đường dẫn này đúng

/**
 * @private
 * Bước 1: Gọi API gợi ý (Flask) thông qua backend Node.js
 * Trả về một mảng các ID (SKU), ví dụ: ["id_1", "id_2"]
 */
const getRecommendationIds = async (userId, n = 15) => {
  try {
    // Đây là hàm 'getRecommendations' cũ của bạn
    const res = await api.get(`/recommend/${userId}?n=${n}`);
    return res.data?.recommendations || [];
  } catch (error) {
    console.error("❌ Lỗi khi gọi API gợi ý (lấy IDs):", error);
    return [];
  }
};

// =================================================================
// ⬇️ BẠN CŨNG THIẾU HÀM NÀY ⬇️
// =================================================================
/**
 * @private
 * Bước 2: Tạo một Map (bộ tra cứu) từ tất cả sản phẩm
 * Trả về một Map: [ "product_id_color_storage" -> { full_variant_object } ]
 */
const createVariantMap = async () => {
  // Lấy tất cả sản phẩm
  const { products: allProducts = [] } = await getAllProducts({ limit: 1000 });

  if (allProducts.length === 0) {
    return new Map();
  }

  const variantMap = new Map();
  for (const product of allProducts) { //
    for (const variant of product.variants) { //
      
      // Tái tạo lại 'item_id' (SKU) dựa trên logic của train.py
      // Dựa trên schema 'Product.js', 'Order.js', 'Cart.js'
      const itemId = `${product._id.toString()}_${variant.color}_${variant.storage}`;
      
      const imageUrl = variant.images?.[0]
        ? variant.images[0].startsWith("http")
          ? variant.images[0]
          // ⚠️ Đảm bảo cổng 3001 là đúng
          : `http://localhost:3001${variant.images[0]}` 
        : "/default-image.jpg";

      // Thêm vào Map với một đối tượng đã được "làm phẳng"
      variantMap.set(itemId, {
        _id: product._id, // ID sản phẩm gốc
        variant_id: variant._id, // ID của biến thể
        name: product.name,
        storage: variant.storage,
        price: variant.price,
        stock: variant.stock,
        imageUrl: imageUrl,
      });
    }
  }
  console.log("CAC KEYS TU JAVASCRIPT:", Array.from(variantMap.keys()));
  return variantMap;
};

// =================================================================
// HÀM CHÍNH MÀ BẠN ĐÃ COPY
// =================================================================
/**
 * @public
 * HÀM CHÍNH: Lấy và "Hydrate" (làm đầy) các sản phẩm gợi ý
 * Đây là hàm duy nhất mà component React sẽ gọi.
 */
export const getHydratedRecommendations = async (userId, n = 15) => {
  try {
    // Chạy cả hai bước song song để tăng tốc
    // HÀM NÀY SẼ GỌI 2 HÀM BÊN TRÊN
    const [recommendedIds, variantMap] = await Promise.all([
      getRecommendationIds(userId, n),
      createVariantMap()
    ]);

    if (recommendedIds.length === 0 || variantMap.size === 0) {
      return []; // Không có gì để gợi ý
    }

    // Bước 3: "Hydrate" - Lọc và sắp xếp
    const hydratedProducts = [];
    for (const recId of recommendedIds) {
      if (variantMap.has(recId)) {
        hydratedProducts.push(variantMap.get(recId));
      }
    }
    
    return hydratedProducts;
  } catch (error) {
    console.error("❌ Lỗi nghiêm trọng khi hydrate gợi ý:", error);
    return [];
  }
};