import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "33,000,000₫",
    image: "/images/iphone15.jpg",
    link: "/products/phones/iphone-15-pro-max",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: "29,000,000₫",
    image: "/images/s23ultra.jpg",
    link: "/products/phones/s23-ultra",
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: "25,000,000₫",
    image: "/images/pixel8pro.jpg",
    link: "/products/phones/pixel-8-pro",
  },
];

const Products = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-red-500 font-bold">{product.price}</p>
            <Link
              to={product.link}
              className="mt-2 block text-blue-600 hover:underline"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
