import { useParams } from "react-router-dom";

const productDetails = {
  "iphone-15-pro-max": {
    name: "iPhone 15 Pro Max",
    price: "33,000,000₫",
    description:
      "Điện thoại flagship của Apple với chip A17 Pro và màn hình ProMotion 120Hz.",
  },
  "s23-ultra": {
    name: "Samsung Galaxy S23 Ultra",
    price: "29,000,000₫",
    description:
      "Điện thoại cao cấp của Samsung với camera 200MP và bút S-Pen.",
  },
  "pixel-8-pro": {
    name: "Google Pixel 8 Pro",
    price: "25,000,000₫",
    description: "Điện thoại Pixel với chip Tensor G3 và tính năng AI mạnh mẽ.",
  },
};

const PhoneDetails = () => {
  const { productId } = useParams();
  const product = productDetails[productId];

  if (!product) {
    return <h1 className="text-red-500 text-xl">Sản phẩm không tồn tại!</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-red-500 text-lg font-semibold">{product.price}</p>
      <p className="mt-2">{product.description}</p>
    </div>
  );
};

export default PhoneDetails;
