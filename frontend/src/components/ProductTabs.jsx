import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "iphone", name: "iPhone" },
  { id: "watch", name: "Watch" },
  { id: "ipad", name: "Ipad" },
  { id: "nokia", name: "Nokia" },
  { id: "intel", name: "Itel" },
  { id: "realme", name: "Realme" },
];

const products = [
  {
    id: 1,
    name: "iPhone 16e 128GB - Chính hãng VN/A",
    price: "16,390,000đ",
    image: "/images/products/iphone/iPhone 16e 128GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 2,
    name: "iPhone 16 128GB - Chính hãng VN/A",
    price: "19,290,000đ",
    image: "/images/products/iphone/iPhone 16 128GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 3,
    name: "iPhone 16 Plus 128GB - Chính hãng VN/A",
    price: "21,990,000₫",
    image: "/images/products/iphone/iPhone 16 Plus 128GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 4,
    name: "iPhone 16 Pro 128GB - Chính hãng VN/A",
    price: "24,790,000₫",
    image: "/images/products/iphone/iPhone 16 Pro 128GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 5,
    name: "iPhone 16 Pro Max 256GB - Chính hãng VN/A",
    price: "30,790,000₫",
    image:
      "/images/products/iphone/iPhone 16 Pro Max 256GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 6,
    name: "iPhone 15 128GB - Chính hãng VN/A",
    price: "15,790,000₫",
    image: "/images/products/iphone/iPhone 15 128GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 7,
    name: "iPhone 15 Plus 128GB - Chính hãng VN/A",
    price: "18,990,000₫",
    image: "/images/products/iphone/iPhone 15 Plus 128GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 8,
    name: "iPhone 14 128GB - Chính hãng VN/A",
    price: "12,790,000₫",
    image: "/images/products/iphone/iPhone 14 128GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 9,
    name: "iPhone 14 Plus 128GB - Chính hãng VN/A",
    price: "17,790,000₫",
    image: "/images/products/iphone/iPhone 14 Plus 128GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 10,
    name: "iPhone 13 128GB - Chính hãng VN/A",
    price: "11,690,000₫",
    image: "/images/products/iphone/iPhone 13 128GB - Chính Hãng VN A.jpg",
    category: "iphone",
  },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.category === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 font-medium text-gray-700 border-b-2 ${
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
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-3 border rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-white cursor-pointer flex flex-col items-center text-center"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="w-32 h-32 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-wrap mt-3 line-clamp-2 h-12">
                {product.name}
              </h3>
              <p className="text-red-500 font-bold text-base mt-1">
                {product.price}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-2 sm:col-span-3">
            Không có sản phẩm nào.
          </p>
        )}
      </div>
    </div>
  );
}
