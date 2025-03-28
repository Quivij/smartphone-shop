import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/productsData"; // Import dữ liệu

function Products() {
  const { category, subcategory } = useParams(); // Lấy category và subcategory từ URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let filteredProducts = productsData.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );

    if (subcategory) {
      filteredProducts = filteredProducts.filter(
        (p) => p.series && p.series.toLowerCase() === subcategory.toLowerCase()
      );
    }

    setProducts(filteredProducts);
  }, [category, subcategory]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Sản phẩm {category.toUpperCase()}{" "}
        {subcategory ? ` - ${subcategory}` : ""}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-2 shadow-md rounded-lg">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover cursor-pointer rounded-md"
                />
              </Link>
              <h3 className="text-lg font-semibold mt-2 text-center">
                {product.name}
              </h3>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
