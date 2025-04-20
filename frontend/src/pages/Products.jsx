import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: "price_asc",
    search: "",
    stock: "",
    filter: "", // category, brand
  });

  const { data: productsData, isLoading, isError } = useProducts(filters);

  // Xử lý thay đổi filter
  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1, // Reset lại trang về 1 khi thay đổi filter
    }));
  };

  // Xử lý tìm kiếm
  const handleSearchChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1, // Reset lại trang về 1 khi tìm kiếm
    }));
  };

  // Xử lý sắp xếp
  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      sort: e.target.value,
      page: 1, // Reset lại trang về 1 khi thay đổi sắp xếp
    }));
  };

  const handlePagination = (pageNumber) => {
    setFilters((prev) => ({
      ...prev,
      page: pageNumber,
    }));
  };

  useEffect(() => {
    // Nếu cần thực hiện các tác vụ sau khi tải dữ liệu, bạn có thể đặt ở đây
  }, [productsData]);

  if (isLoading) return <div>Đang tải sản phẩm...</div>;
  if (isError) return <div>Lỗi khi tải sản phẩm</div>;

  return (
    <div className="p-6">
      {/* Tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={filters.search}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Lọc sản phẩm */}
      <div className="flex gap-4 mb-4">
        <select
          name="stock"
          value={filters.stock}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Tất cả tình trạng kho</option>
          <option value="in">Còn hàng</option>
          <option value="out">Hết hàng</option>
        </select>

        <select
          name="filter"
          value={filters.filter}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Tất cả danh mục</option>
          <option value="smartphone">Điện thoại</option>
          <option value="laptop">Máy tính</option>
          {/* Thêm các danh mục khác ở đây */}
        </select>

        <select
          name="sort"
          value={filters.sort}
          onChange={handleSortChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="price_asc">Giá: Thấp đến cao</option>
          <option value="price_desc">Giá: Cao đến thấp</option>
          <option value="name_asc">Tên: A-Z</option>
          <option value="name_desc">Tên: Z-A</option>
          <option value="created_asc">Ngày tạo: Cũ đến mới</option>
          <option value="created_desc">Ngày tạo: Mới đến cũ</option>
        </select>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsData?.products?.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => handlePagination(filters.page - 1)}
          disabled={filters.page === 1}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Trước
        </button>
        <span>{`Trang ${filters.page} / ${productsData?.pagination?.totalPages}`}</span>
        <button
          onClick={() => handlePagination(filters.page + 1)}
          disabled={filters.page === productsData?.pagination?.totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default Products;
