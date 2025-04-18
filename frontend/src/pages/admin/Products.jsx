import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllProducts,
  deleteProductById,
  deleteMultipleProducts,
} from "../../api/product"; // Thêm deleteMultipleProducts
import { useMutationHook } from "../../hooks/useMutationHook";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import ConfirmModal from "../../components/common/ConfirmModal";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_desc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmDeleteManyOpen, setIsConfirmDeleteManyOpen] = useState(false); // Confirm modal for delete many
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-products", debouncedSearch, stockFilter, sortBy, page],
    queryFn: () =>
      getAllProducts({
        search: debouncedSearch,
        stock: stockFilter,
        sort: sortBy,
        page: 1,
        limit: 100000,
      }),
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const pagination = data?.pagination || {};

  // Mutation for deleting a single product
  const deleteMutation = useMutationHook(deleteProductById, {
    onSuccess: () => {
      toast.success("Xoá sản phẩm thành công");
      refetch();
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  // Mutation for deleting multiple products
  const deleteMultipleMutation = useMutationHook(deleteMultipleProducts, {
    onSuccess: () => {
      toast.success("Xoá nhiều sản phẩm thành công");
      setSelectedProducts([]); // Clear selected products after successful delete
      refetch();
    },
    onError: () => {
      toast.error("Xoá nhiều sản phẩm thất bại");
    },
  });

  const handleDelete = (id) => {
    setSelectedProduct(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(selectedProduct);
    setIsConfirmOpen(false);
  };

  // Handle selecting or deselecting a product
  const handleProductSelect = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle selecting or deselecting all products on the page
  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]); // Deselect all if all are selected
    } else {
      setSelectedProducts(products.map((product) => product._id)); // Select all
    }
  };

  // Confirm delete multiple products
  const confirmDeleteMany = () => {
    deleteMultipleMutation.mutate(selectedProducts);
    setIsConfirmDeleteManyOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleStockChange = (e) => {
    setStockFilter(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && page > 1) {
      setPage((prev) => prev - 1);
    } else if (direction === "next" && page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleExportExcel = () => {
    if (!products || products.length === 0) {
      toast.info("Không có dữ liệu sản phẩm để xuất");
      return;
    }

    const pageSize = 50; // Số dòng trên mỗi trang
    const totalPages = Math.ceil(products.length / pageSize);

    const workbook = XLSX.utils.book_new();

    // Tạo worksheet cho mỗi trang
    for (let page = 0; page < totalPages; page++) {
      const startIdx = page * pageSize;
      const endIdx = Math.min(startIdx + pageSize, products.length);
      const pageProducts = products.slice(startIdx, endIdx);

      // Format dữ liệu cho mỗi trang
      const formattedProducts = pageProducts.map((product, index) => {
        const totalStock = product.variants.reduce(
          (acc, variant) => acc + parseInt(variant.stock),
          0
        );

        const colorStockInfo = product.variants
          .map((variant) => {
            const color = variant.color || "Không rõ";
            const stock = variant.stock ?? 0;
            return `${color}: ${stock}`;
          })
          .join(", ");

        return {
          STT: startIdx + index + 1,
          "Tên sản phẩm": product.name,
          Giá: product.price.toLocaleString("vi-VN") + " đ",
          "Tồn kho": totalStock,
          "Đã bán": product.sold || 0,
          "Còn hàng": totalStock > 0 ? "✔️" : "❌",
          "Chi tiết màu & tồn kho": colorStockInfo,
          "Ngày tạo": new Date(product.createdAt).toLocaleDateString("vi-VN"),
          "Ngày cập nhật": new Date(product.updatedAt).toLocaleDateString(
            "vi-VN"
          ),
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Trang ${page + 1}`);
    }

    // Xuất workbook ra file Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "danh_sach_san_pham.xlsx");
  };
  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Đã xảy ra lỗi khi tải sản phẩm</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Link
          to="/admin/products/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Thêm sản phẩm
        </Link>
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Xuất Excel
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên sản phẩm..."
          className="border p-2 rounded-md w-full sm:w-1/3"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="border p-2 rounded-md"
          value={stockFilter}
          onChange={handleStockChange}
        >
          <option value="all">Tất cả kho</option>
          <option value="in">Còn hàng</option>
          <option value="out">Hết hàng</option>
        </select>
        <select
          className="border p-2 rounded-md"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
          <option value="created_desc">Mới nhất</option>
          <option value="created_asc">Cũ nhất</option>
        </select>
      </div>

      <div className="flex items-center mb-4">
        {/* <input
          type="checkbox"
          checked={selectedProducts.length === products.length}
          onChange={handleSelectAll}
          className="mr-2"
        />
        <label>Chọn tất cả</label> */}
        <button
          onClick={() => setIsConfirmDeleteManyOpen(true)}
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          disabled={selectedProducts.length === 0}
        >
          Xoá nhiều
        </button>
      </div>

      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
            <tr>
              <th className="p-3 border">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3 border">Tên</th>
              <th className="p-3 border">Giá</th>
              <th className="p-3 border">Kho</th>
              <th className="p-3 border">Đã bán</th>
              <th className="p-3 border">Ngày tạo</th>
              <th className="p-3 border text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {products.map((p) => {
              // Tính tổng tồn kho từ các biến thể
              const totalStock = Array.isArray(p.variants)
                ? p.variants.reduce(
                    (acc, variant) => acc + parseInt(variant.stock),
                    0
                  )
                : 0;

              return (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(p._id)}
                      onChange={() => handleProductSelect(p._id)}
                    />
                  </td>
                  <td className="p-3 border">{p.name}</td>
                  <td className="p-3 border text-green-600">
                    {p.price.toLocaleString()}₫
                  </td>
                  <td className="p-3 border">
                    {totalStock > 0 ? (
                      <>
                        <span className="text-blue-600">Còn {totalStock}</span>
                        <div>
                          {p.variants?.map((variant) => (
                            <div key={variant._id} className="text-sm">
                              {variant.color}: {variant.stock}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <span className="text-red-500">Hết hàng</span>
                    )}
                  </td>

                  <td className="p-3 border">{p.sold}</td>
                  <td className="p-3 border">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/products/edit/${p._id}`}
                        className="text-blue-600 hover:text-blue-800"
                        title="Sửa"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Xoá"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Previous
        </button>
        <span>{`Trang ${page} / ${pagination.totalPages}`}</span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={page === pagination.totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Next
        </button>
      </div>

      {/* Confirm Delete Modal for single product */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa sản phẩm?"
        message="Bạn có chắc chắn muốn xóa sản phẩm này?"
      />

      {/* Confirm Delete Modal for multiple products */}
      <ConfirmModal
        isOpen={isConfirmDeleteManyOpen}
        onClose={() => setIsConfirmDeleteManyOpen(false)}
        onConfirm={confirmDeleteMany}
        title="Xóa nhiều sản phẩm?"
        message="Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?"
      />
    </div>
  );
};

export default AdminProduct;
