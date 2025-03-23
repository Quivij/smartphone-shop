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
    name: "iPhone 1616 128GB - Chính hãng VN/A",
    price: "31,990,000đ",
    image: "/images/products/iphone/iPhone 16 128GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 2,
    name: "iPhone 16 Plus 128GB - Chính hãng VN/A",
    price: "33,990,000đ",
    image: "/images/products/iphone/iPhone 16 Plus 512GB - Chính hãng VN A.jpg",
    category: "iphone",
  },
  {
    id: 3,
    name: "iPhone 16 Pro",
    price: "38,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/iphone-16-pro.jpg",
    category: "iphone",
  },
  {
    id: 4,
    name: "iPhone 16 Pro Max",
    price: "42,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/iphone-16-pro-max.jpg",
    category: "iphone",
  },
  {
    id: 5,
    name: "iPhone 15",
    price: "25,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/iphone-15.jpg",
    category: "iphone",
  },
  {
    id: 6,
    name: "iPhone 15 Plus",
    price: "28,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/iphone-15-plus.jpg",
    category: "iphone",
  },
  {
    id: 7,
    name: "iPhone 14",
    price: "21,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/iphone-14.jpg",
    category: "iphone",
  },
  {
    id: 8,
    name: "iPhone 14 Plus",
    price: "24,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/iphone-14-plus.jpg",
    category: "iphone",
  },
  {
    id: 9,
    name: "iPhone 13",
    price: "18,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/iphone-13.jpg",
    category: "iphone",
  },
  {
    id: 10,
    name: "Apple Watch S10",
    price: "12,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/apple-watch-s10.jpg",
    category: "watch",
  },
  {
    id: 11,
    name: "Apple Watch Ultra",
    price: "22,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/apple-watch-ultra.jpg",
    category: "watch",
  },
  {
    id: 12,
    name: "Apple Watch S9",
    price: "11,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/apple-watch-s9.jpg",
    category: "watch",
  },
  {
    id: 13,
    name: "Apple Watch SE",
    price: "8,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/apple-watch-se.jpg",
    category: "watch",
  },
  {
    id: 14,
    name: "iPad Pro",
    price: "29,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/ipad-pro.jpg",
    category: "ipad",
  },
  {
    id: 15,
    name: "iPad Air M3 Mới",
    price: "19,990,000đ",
    image: "https://store.storeimages.cdn-apple.com/ipad-air-m3.jpg",
    category: "ipad",
  },
  {
    id: 16,
    name: "Galaxy S25 Ultra",
    price: "41,990,000đ",
    image: "https://images.samsung.com/s25-ultra.jpg",
    category: "samsung",
  },
  {
    id: 17,
    name: "Galaxy S25 Plus",
    price: "38,990,000đ",
    image: "https://images.samsung.com/s25-plus.jpg",
    category: "samsung",
  },
  {
    id: 18,
    name: "Nokia HDM 105 4G",
    price: "790,000đ",
    image: "https://nokia.com/nokia-105-4g.jpg",
    category: "nokia",
  },
  {
    id: 19,
    name: "Itel it9211",
    price: "590,000đ",
    image: "https://itel.com/itel-it9211.jpg",
    category: "itel",
  },
  {
    id: 20,
    name: "Realme Note Series",
    price: "8,990,000đ",
    image: "https://realme.com/realme-note.jpg",
    category: "realme",
  },
  {
    id: 21,
    name: "Realme C Series",
    price: "6,990,000đ",
    image: "https://realme.com/realme-c.jpg",
    category: "realme",
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
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-red-500 font-bold text-lg">{product.price}</p>
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
