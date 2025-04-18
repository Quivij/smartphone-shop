import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/product"; // sửa lại đường dẫn theo dự án của bạn

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "iphone", name: "iPhone" },
  { id: "watch", name: "Watch" },
  { id: "ipad", name: "Ipad" },
  { id: "samsung", name: "SamSung" },
  { id: "smartphone", name: "Điện Thoại" }, // nếu backend trả category là "smartphone"
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", activeTab],
    queryFn: () =>
      getAllProducts(activeTab === "all" ? {} : { category: activeTab }),
  });

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.category === activeTab);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 font-medium whitespace-nowrap text-gray-700 border-b-2 ${
              activeTab === category.id
                ? "border-blue-500 text-blue-500"
                : "border-transparent hover:text-blue-500"
            } transition-colors duration-200`}
            onClick={() => setActiveTab(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500">
            Đang tải sản phẩm...
          </p>
        ) : isError ? (
          <p className="col-span-full text-center text-red-500">
            Lỗi tải dữ liệu sản phẩm.
          </p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="p-3 border rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-white cursor-pointer flex flex-col items-center text-center"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <div className="w-32 h-32 flex items-center justify-center">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="text-sm sm:text-base font-semibold mt-3 line-clamp-2 h-12">
                {product.name}
              </h3>
              <p className="text-red-500 font-bold text-base mt-1">
                {product.price.toLocaleString()} ₫
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Không có sản phẩm nào thuộc danh mục này.
          </p>
        )}
      </div>
    </div>
  );
}
