import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllProducts,
  deleteProductById,
  deleteMultipleProducts,
} from "../../api/product";
import { useMutationHook } from "../../hooks/useMutationHook";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmModal from "../../components/common/ConfirmModal";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmDeleteManyOpen, setIsConfirmDeleteManyOpen] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-products", debouncedSearch, page],
    queryFn: () =>
      getAllProducts({
        search: debouncedSearch,
        page: 1,
        limit: 10000,
      }),
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const pagination = data?.pagination || {};

  const deleteMutation = useMutationHook(deleteProductById, {
    onSuccess: () => {
      toast.success("Xoá sản phẩm thành công");
      refetch();
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  const deleteMultipleMutation = useMutationHook(deleteMultipleProducts, {
    onSuccess: () => {
      toast.success("Xoá nhiều sản phẩm thành công");
      setSelectedProducts([]);
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

  const confirmDeleteMany = () => {
    deleteMultipleMutation.mutate(selectedProducts);
    setIsConfirmDeleteManyOpen(false);
  };

  const handleProductSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p._id));
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && page > 1) setPage((p) => p - 1);
    if (direction === "next" && page < pagination.totalPages)
      setPage((p) => p + 1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleExportExcel = () => {
    if (!products || products.length === 0) {
      toast.info("Không có dữ liệu sản phẩm để xuất");
      return;
    }

    // Chuẩn bị dữ liệu chi tiết cho từng màu và số lượng tồn kho
    const formattedProducts = products.flatMap((product) =>
      product.variants.map((variant) => ({
        "Tên sản phẩm": product.name,
        "Màu sắc": variant.color,
        "Dung lượng": variant.storage,
        Giá: variant.price
          ? variant.price.toLocaleString("vi-VN") + "₫"
          : "Chưa có giá",
        "Tồn kho": variant.stock,
        "Thương hiệu": product.brand,
        "Ngày tạo": product.createdAt
          ? new Date(product.createdAt).toLocaleDateString("vi-VN")
          : "Chưa có",
        "Ngày cập nhật": product.updatedAt
          ? new Date(product.updatedAt).toLocaleDateString("vi-VN")
          : "Chưa có",
      }))
    );

    // Tạo worksheet từ dữ liệu đã được định dạng
    const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sản phẩm");

    // Viết workbook ra file Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
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
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên sản phẩm..."
          className="border p-2 rounded-md w-full sm:w-1/3"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setIsConfirmDeleteManyOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          disabled={selectedProducts.length === 0}
        >
          Xoá nhiều
        </button>
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Xuất Excel
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
              <th className="p-3 border">Tên sản phẩm</th>
              <th className="p-3 border">Giá</th>
              <th className="p-3 border">Tồn kho</th>
              <th className="p-3 border">Đã bán</th>
              <th className="p-3 border">Còn hàng</th>
              <th className="p-3 border">Ngày tạo</th>
              <th className="p-3 border">Ngày cập nhật</th>
              <th className="p-3 border text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="p-3 border">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleProductSelect(product._id)}
                  />
                </td>
                <td className="p-3 border">{product.name}</td>
                <td className="p-3 border">
                  {product.variants?.length > 0
                    ? Math.min(
                        ...product.variants.map((v) => v.price)
                      ).toLocaleString("vi-VN") + "₫"
                    : "Chưa có giá"}
                </td>

                <td className="p-3 border">
                  {product.variants && product.variants.length > 0
                    ? product.variants.reduce(
                        (total, variant) => total + variant.stock,
                        0
                      )
                    : 0}
                </td>

                <td className="p-3 border">{product.sold ?? 0}</td>
                <td className="p-3 border">
                  {product.variants.reduce(
                    (total, variant) => total + (variant.stock ?? 0),
                    0
                  ) > 0
                    ? "Còn hàng"
                    : "Hết hàng"}
                </td>

                <td className="p-3 border">
                  {new Date(product.createdAt).toLocaleString("vi-VN")}
                </td>
                <td className="p-3 border">
                  {new Date(product.updatedAt).toLocaleString("vi-VN")}
                </td>
                <td className="p-3 border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Sửa"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xoá"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange("prev")}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Trang trước
        </button>
        <span>
          Trang {pagination.currentPage} / {pagination.totalPages}
        </span>
        <button
          disabled={page === pagination.totalPages}
          onClick={() => handlePageChange("next")}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xác nhận xoá"
        message="Bạn có chắc chắn muốn xoá sản phẩm này không?"
      />

      <ConfirmModal
        isOpen={isConfirmDeleteManyOpen}
        onClose={() => setIsConfirmDeleteManyOpen(false)}
        onConfirm={confirmDeleteMany}
        title="Xác nhận xoá nhiều"
        message="Bạn có chắc chắn muốn xoá các sản phẩm đã chọn?"
      />
    </div>
  );
};

export default AdminProduct;
