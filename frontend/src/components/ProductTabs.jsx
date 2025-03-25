import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "iphone", name: "iPhone" },
  { id: "watch", name: "Watch" },
  { id: "ipad", name: "Ipad" },
  { id: "samsung", name: "SamSung" },
  { id: "nokia", name: "Nokia" },
  { id: "itel", name: "Itel" },
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
  {
    id: 11,
    name: "Apple Watch S10 GPS 42mm Viền Nhôm Dây Vải - Chính hãng VN/A",
    price: "9,890,000đ",
    image:
      "/images/products/Watch/Apple Watch S10 GPS 42mm Viền Nhôm Dây Vải - Chính hãng VN A.jpg",
    category: "watch",
  },
  {
    id: 12,
    name: "Apple Watch Ultra 2 (2024) LTE 49mm Viền Titanium Dây Alpine Loop",
    price: "21,790,000đ",
    image:
      "/images/products/Watch/Apple Watch Ultra 2 (2024) LTE 49mm Viền Titanium Dây Trail Loop.jpg",
    category: "watch",
  },
  {
    id: 13,
    name: "Apple Watch S9 LTE 41mm Viền Nhôm Dây Cao Su - Chính hãng VN/A",
    price: "9,390,000đ",
    image:
      "/images/products/Watch/Apple Watch S9 LTE 41mm Viền Nhôm Dây Cao Su - Chính hãng VN A.jpg",
    category: "watch",
  },
  {
    id: 14,
    name: "Apple Watch SE 2 2024 GPS 40mm Viền Nhôm Dây Cao Su - Chính hãng VN/A",
    price: "5,590,000đ",
    image:
      "/images/products/Watch/Apple Watch SE 2 2024 LTE 44mm Viền Nhôm Dây Cao Su - Chính hãng VN A.jpg",
    category: "watch",
  },
  {
    id: 15,
    name: "iPad Pro M4 11 inch 5G 512GB - Chính hãng VN",
    price: "37,390,000đ",

    image:
      "/images/products/iPad/iPad Pro M4 11 inch 5G 512GB - Chính hãng VN.jpg",
    category: "ipad",
  },
  {
    id: 16,
    name: "iPad Pro M4 13 inch 5G 256GB - Chính hãng VN",
    price: "40,490,000đ",

    image:
      "/images/products/iPad/iPad Pro M4 13 inch 5G 256GB - Chính hãng VN.jpg",
    category: "ipad",
  },
  {
    id: 17,
    name: "iPad Air 7 M3 11 inch Wifi 128GB - Chính hãng VN",
    price: "16,990,000đ",

    image:
      "/images/products/iPad/iPad Air 7 M3 11 inch Wifi 128GB - Chính hãng VN.jpg",
    category: "ipad",
  },
  {
    id: 18,
    name: "iPad Air 6 M2 11 inch 5G 128GB- Chính hãng VN",
    price: "18,490,000đ",

    image:
      "/images/products/iPad/iPad Air 6 M2 11 inch 5G 128GB- Chính hãng VN.jpg",
    category: "ipad",
  },
  {
    id: 19,
    name: "iPad Gen 11 5G A16 128GB - Chính hãng VN",
    price: "13,990,000đ",

    image: "/images/products/iPad/iPad Gen 11 5G A16 128GB - Chính hãng VN.jpg",
    category: "ipad",
  },
  {
    id: 20,
    name: "iPad Gen 10 Wifi 64GB - Chính hãng VN",
    price: "8,590,000đ",

    image: "/images/products/iPad/iPad Gen 10 Wifi 64GB - Chính hãng VN.jpg",
    category: "ipad",
  },
  {
    id: 21,
    name: "iPad Gen 9 Wifi 64GB - Chính Hãng VN",
    price: "6,890,000đ",

    image: "/images/products/iPad/iPad Gen 9 Wifi 64GB - Chính Hãng VN.jpg",
    category: "ipad",
  },
  {
    id: 22,
    name: "Samsung Galaxy S25 Ultra 5G 12GB 256GB",
    price: "26,990,000đ",

    image:
      "/images/products/SamSung/Samsung Galaxy S25 Ultra 5G 12GB 256GB.png",
    category: "samsung",
  },

  {
    id: 23,
    name: "Samsung Galaxy S25 Plus 5G 12GB 256GB",
    price: "23,990,000đ",
    image: "/images/products/SamSung/Samsung Galaxy S25 Plus 5G 12GB 256GB.png",
    category: "samsung",
  },
  {
    id: 24,
    name: "Samsung Galaxy S25 5G 12GB 256GB",
    price: "20,990,000đ",
    image: "/images/products/SamSung/Samsung Galaxy S25 5G 12GB 256GB.png",
    category: "samsung",
  },
  {
    id: 25,
    name: "Samsung Galaxy Z Flip6 12GB 256GB",
    price: "24,490,000đ",
    image: "/images/products/SamSung/Samsung Galaxy Z Flip6 12GB 256GB.png",
    category: "samsung",
  },
  {
    id: 26,
    name: "Samsung Galaxy Z Fold6 12GB 256GB",
    price: "36,990,000đ",
    image: "/images/products/SamSung/Samsung Galaxy Z Fold6 12GB 256GB.png",
    category: "samsung",
  },
  {
    id: 27,
    name: "Samsung Galaxy S24 FE 8GB 256GB",
    price: "17,690,000đ",
    image: "/images/products/SamSung/Samsung Galaxy S24 8GB 256GB.png",
    category: "samsung",
  },
  {
    id: 28,
    name: "Samsung Galaxy S24 Ultra 12GB 256GB",
    price: "22,990,000đ",
    image:
      "/images/products/SamSung/samsung-galaxy-s24-5g-ultra-vang-minh-tuan-mobile-240427043336.png",
    category: "samsung",
  },
  {
    id: 29,
    name: "Samsung Galaxy S24 Plus 12GB 256GB",
    price: "22,490,000đ",
    image:
      "/images/products/SamSung/samsung-galaxy-s24-5g-plus-den-minh-tuan-mobile-240427042941.png",
    category: "samsung",
  },
  {
    id: 30,
    name: "Samsung Galaxy S24 8GB 512GB",
    price: "17,090,000đ",
    image: "/images/products/SamSung/Samsung Galaxy S24 8GB 512GB.png",
    category: "samsung",
  },
  {
    id: 31,
    name: "Samsung Galaxy A36 5G 8GB 128GB",
    price: "7,290,000đ",
    image: "/images/products/SamSung/Samsung Galaxy A36 5G 8GB 128GB.png",
    category: "samsung",
  },
  {
    id: 32,
    name: "Samsung Galaxy A35 5G 8GB 128GB",
    price: "6,590,000đ",
    image: "/images/products/SamSung/Samsung Galaxy A35 5G 8GB 128GB.png",
    category: "samsung",
  },
  {
    id: 33,
    name: "Samsung Galaxy A16 5G 8GB 128GB",
    price: "5,490,000đ",
    image: "/images/products/SamSung/Samsung Galaxy A16 5G 8GB 128GB.png",
    category: "samsung",
  },
  {
    id: 35,
    name: "Nokia HMD 105 4G",
    price: "580,000đ",
    image: "/images/products/Nokia/Nokia HMD 105 4G.jpg",
    category: "nokia",
  },
  {
    id: 36,
    name: "Nokia 105 4G Pro",
    price: "650,000đ",
    image: "/images/products/Nokia/Nokia 105 4G Pro.jpg",
    category: "nokia",
  },
  {
    id: 37,
    name: "Nokia 110 4G Pro",
    price: "750,000đ",
    image: "/images/products/Nokia/Nokia 110 4G Pro.jpg",
    category: "nokia",
  },
  {
    id: 38,
    name: "Nokia 220 4G",
    price: "890,000đ",
    image: "/images/products/Nokia/Nokia 220 4G.jpg",
    category: "nokia",
  },
  {
    id: 39,
    name: "Nokia 3210 4G",
    price: "1,200,000đ",
    image: "/images/products/Nokia/Nokia 3210 4G.jpg",
    category: "nokia",
  },
  {
    id: 40,
    name: "Itel it9211",
    price: "450,000đ",
    image: "/images/products/Itel/Điện thoại Itel it9211.jpg",
    category: "itel",
  },
  {
    id: 41,
    name: "Itel it9310",
    price: "500,000đ",
    image: "/images/products/Itel/Điện thoại Itel it9310.jpg",
    category: "itel",
  },
  {
    id: 42,
    name: "Itel it2600",
    price: "380,000đ",
    image: "/images/products/Itel/Điện thoại Itel it2600.jpg",
    category: "itel",
  },
  {
    id: 43,
    name: "Itel it8010",
    price: "320,000đ",
    image: "/images/products/Itel/Điện thoại Itel it8010.jpg",
    category: "itel",
  },
  {
    id: 44,
    name: "Điện thoại Realme Note 60x 3GB 64GB",
    price: "2,490,000đ",
    image: "/images/products/Realme/Điện thoại Realme Note 60x 3GB 64GB.jpg",
    category: "realme",
  },
  {
    id: 45,
    name: "Điện thoại Realme Note 60 4GB 64GB",
    price: "2,790,000đ",
    image: "/images/products/Realme/Điện thoại Realme Note 60 4GB 64GB.jpg",
    category: "realme",
  },
  {
    id: 46,
    name: "Điện thoại Realme C61 6GB 128GB",
    price: "3,490,000đ",
    image: "/images/products/Realme/Điện thoại Realme C61 6GB 128GB.jpg",
    category: "realme",
  },
  {
    id: 47,
    name: "Điện thoại Realme C65s 8GB 256GB",
    price: "4,490,000đ",
    image: "/images/products/Realme/Điện thoại Realme C65s 8GB 256GB.jpg",
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
