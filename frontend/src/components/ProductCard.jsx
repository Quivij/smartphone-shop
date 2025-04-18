import React from "react";

const ProductCard = ({ product }) => {
  const {
    name,
    description,
    price,
    stock,
    brand,
    category,
    images,
    createdAt,
  } = product;

  const imageUrl = images?.[0]
    ? `${import.meta.env.VITE_API_BASE_URL}${images[0]}`
    : "https://via.placeholder.com/300";

  return (
    <div className="rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition flex flex-col">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h2 className="text-lg font-semibold line-clamp-2">{name}</h2>
      <p className="text-sm text-gray-600 line-clamp-2 mb-1">{description}</p>

      <div className="text-sm text-gray-700">
        Thương hiệu: <b>{brand}</b>
      </div>
      <div className="text-sm text-gray-700">
        Danh mục: <b>{category}</b>
      </div>
      <div className="text-sm text-gray-700">
        Tồn kho: <b>{stock}</b> sản phẩm
      </div>

      <div className="mt-2 text-blue-600 font-bold text-lg">
        {price.toLocaleString()}₫
      </div>

      <div className="text-xs text-gray-400 mt-auto">
        Tạo lúc: {new Date(createdAt).toLocaleString("vi-VN")}
      </div>
    </div>
  );
};

export default ProductCard;
