import React from "react";
// import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Danh sách sản phẩm mở rộng
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "32,990,000đ",
    image:
      "https://via.placeholder.com/300x200/0000FF/FFFFFF?text=iPhone+15+Pro+Max",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: "29,990,000đ",
    image:
      "https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Galaxy+S24+Ultra",
  },
  {
    id: 3,
    name: "Xiaomi 13 Pro",
    price: "19,990,000đ",
    image:
      "https://via.placeholder.com/300x200/008000/FFFFFF?text=Xiaomi+13+Pro",
  },
  {
    id: 4,
    name: "Oppo Find X6",
    price: "18,990,000đ",
    image:
      "https://via.placeholder.com/300x200/FFA500/FFFFFF?text=Oppo+Find+X6",
  },
  {
    id: 5,
    name: "Vivo X90 Pro",
    price: "17,990,000đ",
    image:
      "https://via.placeholder.com/300x200/800080/FFFFFF?text=Vivo+X90+Pro",
  },
  {
    id: 6,
    name: "Google Pixel 7 Pro",
    price: "26,990,000đ",
    image: "https://via.placeholder.com/300x200/FFFF00/000000?text=Pixel+7+Pro",
  },
  {
    id: 7,
    name: "Realme GT Neo 5",
    price: "15,990,000đ",
    image:
      "https://via.placeholder.com/300x200/00FFFF/000000?text=Realme+GT+Neo+5",
  },
  {
    id: 8,
    name: "Asus ROG Phone 7",
    price: "30,990,000đ",
    image: "https://via.placeholder.com/300x200/FF69B4/000000?text=ROG+Phone+7",
  },
  {
    id: 9,
    name: "OnePlus 11",
    price: "21,990,000đ",
    image: "https://via.placeholder.com/300x200/4682B4/FFFFFF?text=OnePlus+11",
  },
  {
    id: 10,
    name: "Nothing Phone (2)",
    price: "12,990,000đ",
    image:
      "https://via.placeholder.com/300x200/A52A2A/FFFFFF?text=Nothing+Phone+2",
  },
];

const ProductSlider = () => {
  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4 text-center"></h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1100: { slidesPerView: 4 }, // Giảm kích thước xuống 1100px thay vì 1280px
        }}
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-red-500 font-bold">{product.price}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
