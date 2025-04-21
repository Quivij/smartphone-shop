import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Dialog } from "@headlessui/react";
import ProductSlider from "../components/ProductSlider";
import axios from "axios";

const fetchProductById = async (id) => {
  const res = await axios.get(`http://localhost:3001/api/products/${id}`);
  return res.data;
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  const [currentVariant, setCurrentVariant] = useState(null);

  // Update biến thể khi chọn màu hoặc bộ nhớ
  useEffect(() => {
    if (!product || !product.variants) return;

    const matchedVariant = product.variants.find(
      (variant) =>
        variant.color === selectedColor && variant.storage === selectedStorage
    );

    if (matchedVariant) {
      setCurrentVariant(matchedVariant);
      setSelectedImage(
        matchedVariant.images?.[0]?.startsWith("http")
          ? matchedVariant.images[0]
          : `http://localhost:3001${matchedVariant.images?.[0]}`
      );
    }
  }, [selectedStorage, selectedColor, product]);

  // Chọn mặc định
  useEffect(() => {
    if (product?.variants?.length > 0) {
      const first = product.variants[0];
      setSelectedStorage(first.storage);
      setSelectedColor(first.color);
    }
  }, [product]);

  if (isLoading) return <p className="p-4">Đang tải sản phẩm...</p>;
  if (isError) return <p className="p-4 text-red-500">Lỗi: {error.message}</p>;
  if (!product) return <p className="p-4">Không tìm thấy sản phẩm.</p>;

  const storages = [...new Set(product.variants.map((v) => v.storage))];
  const colors = [
    ...new Set(
      product.variants
        .filter((v) => v.storage === selectedStorage)
        .map((v) => v.color)
    ),
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Ảnh chính */}
        <div className="flex-1 flex flex-col items-center">
          <img
            src={selectedImage || "/default-image.jpg"}
            alt="Product"
            className="w-64 h-auto"
          />
          <div className="flex space-x-2 mt-4">
            {currentVariant?.images?.map((img, idx) => (
              <img
                key={img || idx} // Nếu mỗi ảnh có URL duy nhất, dùng URL làm key
                src={
                  img.startsWith("http") ? img : `http://localhost:3001${img}`
                }
                alt={`Thumb ${idx}`}
                className="w-12 h-12 border-2 cursor-pointer"
                onClick={() =>
                  setSelectedImage(
                    img.startsWith("http") ? img : `http://localhost:3001${img}`
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          <p className="text-gray-500 mb-1">Giá bán</p>
          <p className="text-3xl font-bold text-red-500 mb-4">
            {currentVariant?.price
              ? currentVariant.price.toLocaleString("vi-VN") + " ₫"
              : "Giá chưa cập nhật"}
          </p>

          {/* Dung lượng */}
          <div className="mb-4">
            <p className="text-gray-500 mb-1">Dung lượng</p>
            <div className="flex space-x-2">
              {storages.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStorage(s)}
                  className={`border px-4 py-2 rounded-lg ${
                    selectedStorage === s
                      ? "border-red-500 font-bold"
                      : "border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Màu sắc */}
          <div className="mb-4">
            <p className="text-gray-500 mb-1">Màu sắc</p>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`border px-4 py-2 rounded-lg ${
                    selectedColor === color
                      ? "border-red-500 font-bold"
                      : "border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Hành động */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold">
              Mua Ngay
            </button>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold">
              Thêm vào Giỏ
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="border px-6 py-3 rounded-lg font-bold border-gray-300"
            >
              Xem thông số
            </button>
          </div>
        </div>
      </div>

      {/* Thông số kỹ thuật */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/40 z-40" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-xl font-bold mb-4">
              Thông số kỹ thuật
            </Dialog.Title>
            <table className="w-full border border-gray-300">
              <tbody>
                {product.specifications &&
                  Object.entries(product.specifications).map(
                    ([label, value], idx) => (
                      <tr key={idx} className="border-b border-gray-300">
                        <th className="text-left p-2 bg-gray-100 border-r">
                          {label}
                        </th>
                        <td className="p-2">{value}</td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Đóng
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Slider sản phẩm nổi bật */}
      <h2 className="text-2xl font-bold text-center mt-6">Sản phẩm nổi bật</h2>
      <ProductSlider />
    </div>
  );
};

export default ProductDetail;
