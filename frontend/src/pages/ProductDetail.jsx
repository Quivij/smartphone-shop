import { useState } from "react";
import { Dialog } from "@headlessui/react";
import ProductSlider from "../components/ProductSlider";

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://storage.googleapis.com/a1aa/image/2QVfkF3WebvW1UfHkh7mYEBQK9b_Ol2nlzui5uiFqbo.jpg"
  );
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [selectedColor, setSelectedColor] = useState("Titan Sa Mạc");

  const [isOpen, setIsOpen] = useState(false);
  const images = [
    "https://storage.googleapis.com/a1aa/image/d_YI1Q3P2B0qwE9vMNSwxGKl93Tq2mIR_nAgbEk2Mss.jpg",
    "https://storage.googleapis.com/a1aa/image/A36xclZ0nAg3P_GOIKH_WoJcazRM1kny7MTGtDcyXdM.jpg",
    "https://storage.googleapis.com/a1aa/image/89RAHMyuTQIZRYtunrd9tDjicZQL0rV-yTtWwtTX5wc.jpg",
    "https://storage.googleapis.com/a1aa/image/HFBv1MClNeGeokSkx_hDpZdozvBwZ6iepFzzpX3StLM.jpg",
  ];
  const productDetails = [
    { label: "Model", value: "iPhone 16 128GB" },
    { label: "Màu", value: "Xanh Mòng Két, Hồng, Đen, Xanh Lưu Ly, Trắng" },
    { label: "Dung lượng lưu trữ", value: "128GB" },
    { label: "Trọng lượng", value: "170 gram" },
    { label: "Kích thước", value: "147,6 mm x 71,6 mm x 7,80 mm" },
    {
      label: "Màn hình",
      value:
        "Màn hình Super Retina XDR, OLED 6,1 inch, Dynamic Island, True Tone, HDR",
    },
    { label: "Kháng nước, bụi", value: "IP68" },
    {
      label: "Chip",
      value: "Chip A18, CPU 6 lõi, GPU 5 lõi, Neural Engine 16 lõi",
    },
    {
      label: "Camera",
      value:
        "Fusion 48MP, Telephoto 2x 12MP, Ultra Wide 12MP, Photonic Engine, HDR thông minh 5",
    },
    {
      label: "Quay video",
      value: "4K Dolby Vision, chế độ Điện Ảnh, chống rung quang học",
    },
    {
      label: "Camera TrueDepth",
      value: "Camera 12MP, Photonic Engine, HDR thông minh 5",
    },
    { label: "Face ID", value: "Camera TrueDepth hỗ trợ nhận diện khuôn mặt" },
    {
      label: "Công nghệ",
      value: "AAC, APAC, MP3, Apple Lossless, Dolby Atmos",
    },
    { label: "Sạc và kết nối", value: "USB-C, sạc nhanh, MagSafe" },
    {
      label: "Pin và nguồn điện",
      value: "Lên đến 22 giờ xem video, sạc nhanh 50% trong 30 phút",
    },
    { label: "Hệ điều hành", value: "iOS 18" },
    { label: "Thương hiệu", value: "Mỹ" },
    { label: "Hãng", value: "Apple" },
    { label: "Bảo hành", value: "12 tháng chính hãng" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-center">
          <img src={selectedImage} alt="Product" className="w-64 h-auto" />
          <div className="flex space-x-2 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-12 h-12 border-2 cursor-pointer"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold">
            iPhone 16 Pro Max 256GB - Chính hãng VN/A
          </h1>

          <div className="mt-4">
            <p className="text-gray-500">Giá bán</p>
            <span className="text-3xl font-bold text-red-500">30,790,000đ</span>
          </div>

          {/* Storage Options */}
          <div className="mt-4">
            <p className="text-gray-500">Dung lượng</p>
            <div className="flex space-x-2">
              {["256GB", "512GB", "1TB"].map((storage) => (
                <button
                  key={storage}
                  className={`border-2 p-2 rounded-lg ${
                    selectedStorage === storage
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div className="mt-4">
            <p className="text-gray-500">Màu sắc</p>
            <div className="flex space-x-2">
              {[
                "Titan Sa Mạc",
                "Titan Trắng",
                "Titan Đen",
                "Titan Tự Nhiên",
              ].map((color) => (
                <button
                  key={color}
                  className={`border-2 p-2 rounded-lg ${
                    selectedColor === color
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold">
              Mua Ngay
            </button>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold">
              Thêm vào Giỏ Hàng
            </button>
            <button
              className="border-2 border-gray-300 px-6 py-3 rounded-lg font-bold"
              onClick={() => setIsOpen(true)}
            >
              Xem chi tiết thông số
            </button>
          </div>
        </div>
      </div>

      {/* Modal Hiển Thị Thông Số Kỹ Thuật */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Không có background màu xám hoặc mờ */}
        <div className="fixed inset-0" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 max-h-200 overflow-y-auto">
            <Dialog.Title className="text-xl font-bold">
              Thông Số Chi Tiết
            </Dialog.Title>
            <table className="w-full border-collapse border border-gray-300 ">
              <tbody>
                {productDetails.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <th className="p-3 text-left bg-gray-100 font-semibold border-r border-gray-300">
                      {item.label}
                    </th>
                    <td className="p-3 text-gray-700">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Nút đóng */}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Đóng
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      <h1 className="text-2xl font-bold text-center mt-5">
        Danh sách sản phẩm nổi bật
      </h1>
      <ProductSlider />
    </div>
  );
};

export default ProductDetail;
