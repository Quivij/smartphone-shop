import { useParams } from "react-router-dom";
import productsData from "../data/productsData"; // Import dữ liệu

function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <h2 className="text-center text-xl font-bold">Sản phẩm không tồn tại</h2>
    );
  }

  return (
    <div className="p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto mb-4"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg">{product.description}</p>
    </div>
  );
}

export default ProductDetail;
