import { Link } from "react-router-dom";
import productsData from "../data/productsData"; // Import danh sách sản phẩm

const AllProducts = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tất cả sản phẩm</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="border p-2 rounded-lg shadow hover:shadow-lg flex flex-col items-center"
          >
            <Link to={`/${product.id}`} className="w-full">
              <div className="w-full h-40 flex justify-center items-center bg-gray-100 rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
            </Link>
            <h3 className="text-center mt-2 font-semibold">{product.name}</h3>
            <p className="text-center text-red-500 font-bold">
              {product.price}₫
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
