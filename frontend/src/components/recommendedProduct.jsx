import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// Đảm bảo bạn đang gọi hàm đã đổi tên
import { getHydratedRecommendations } from "../api/recommendApi"; 

// (Đây là component ProductCard, bạn có thể tách ra file riêng hoặc để đây)
const ProductCardComponent = ({ item, navigate }) => (
  <div
    key={item.variant_id}
    className="p-3 border rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-white cursor-pointer flex flex-col items-center text-center"
    onClick={() => navigate(`/product/${item._id}`)}
  >
    {/* ... (phần code render image, name, price) ... */}
    <div className="w-32 h-32 flex items-center justify-center">
      <img src={item.imageUrl} alt={item.name} className="max-w-full max-h-full object-contain rounded-lg" />
    </div>
    <h3 className="text-sm sm:text-base font-semibold mt-3 line-clamp-2 h-12">
      {`${item.name} Chính hãng VN/A ${item.storage}`}
    </h3>
    <p className="text-red-500 font-bold text-base mt-1">
      {typeof item.price === "number" ? item.price.toLocaleString("vi-VN") + " ₫" : "Giá chưa cập nhật"}
    </p>
    <p className={`text-sm font-semibold mt-2 ${item.stock > 0 ? "text-green-500" : "text-red-500"}`}>
      {item.stock > 0 ? "Còn hàng" : "Hết hàng"}
    </p>
  </div>
);


// Component chính
const RecommendedProducts = ({ userId }) => {
  const navigate = useNavigate();

  const {
    data: recommendedProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hydratedRecommendations", userId],
    queryFn: () => getHydratedRecommendations(userId),
    
    // =======================================================
    // ⚠️ ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT ⚠️
    // Nó sẽ ngăn query chạy nếu userId là null, undefined, 
    // hoặc chuỗi rỗng.
    // Nếu bạn vẫn thấy lỗi, hãy kiểm tra kỹ dòng này.
    enabled: !!userId,
    // =======================================================
  });

  // 1. Kiểm tra ngay từ đầu
  // Nếu component được gọi mà không có userId (ví dụ: người dùng chưa đăng nhập)
  // thì không hiển thị gì cả.
  if (!userId) {
    return null; 
  }

  // 2. Các trạng thái tải và lỗi
  if (isLoading) return <p className="text-center text-gray-500">Đang gợi ý sản phẩm...</p>;
  
  // 'isError' sẽ là true nếu API Flask trả về 404 hoặc 500
  if (isError) return <p className="text-center text-red-500">Lỗi khi tải gợi ý.</p>;
  
  // 3. Trạng thái không có gợi ý (khi API trả về mảng rỗng)
  if (recommendedProducts.length === 0) return <p className="text-center text-gray-500">Không có gợi ý nào.</p>;

  // 4. Render kết quả
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Gợi ý cho bạn</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recommendedProducts.map((item) => (
          <ProductCardComponent key={item.variant_id} item={item} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;