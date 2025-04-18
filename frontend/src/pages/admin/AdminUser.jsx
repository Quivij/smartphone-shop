import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllUsers,
  deleteUserById,
  deleteMultipleUsers,
} from "../../api/auth";
import { useMutationHook } from "../../hooks/useMutationHook";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmModal from "../../components/common/ConfirmModal";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmDeleteManyOpen, setIsConfirmDeleteManyOpen] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-users", debouncedSearch, page],
    queryFn: () =>
      getAllUsers({
        search: debouncedSearch,
        page: 1,
        limit: 10000,
      }),
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const pagination = data?.pagination || {};

  const deleteMutation = useMutationHook(deleteUserById, {
    onSuccess: () => {
      toast.success("Xoá người dùng thành công");
      refetch();
    },
    onError: () => {
      toast.error("Xoá thất bại");
    },
  });

  const deleteMultipleMutation = useMutationHook(deleteMultipleUsers, {
    onSuccess: () => {
      toast.success("Xoá nhiều người dùng thành công");
      setSelectedUsers([]);
      refetch();
    },
    onError: () => {
      toast.error("Xoá nhiều người dùng thất bại");
    },
  });

  const handleDelete = (id) => {
    setSelectedUser(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(selectedUser);
    setIsConfirmOpen(false);
  };

  const confirmDeleteMany = () => {
    deleteMultipleMutation.mutate(selectedUsers);
    setIsConfirmDeleteManyOpen(false);
  };

  const handleUserSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u) => u._id));
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
    if (!users || users.length === 0) {
      toast.info("Không có dữ liệu người dùng để xuất");
      return;
    }

    const formattedUsers = users.map((user, index) => ({
      STT: index + 1,
      "Họ tên": user.name,
      Email: user.email,
      "Số điện thoại": user.phone || "—",
      "Vai trò": user.isAdmin ? "Admin" : "Người dùng",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách người dùng");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "danh_sach_nguoi_dung.xlsx");
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Đã xảy ra lỗi khi tải người dùng</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Link
          to="/admin/users/create"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Thêm người dùng
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên hoặc email..."
          className="border p-2 rounded-md w-full sm:w-1/3"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex items-center mb-4">
        <button
          onClick={() => setIsConfirmDeleteManyOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          disabled={selectedUsers.length === 0}
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
                  checked={selectedUsers.length === users.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3 border">Tên</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">SĐT</th>
              <th className="p-3 border">Vai trò</th>
              <th className="p-3 border text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {users.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="p-3 border">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(u._id)}
                    onChange={() => handleUserSelect(u._id)}
                  />
                </td>
                <td className="p-3 border">{u.name}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">{u.phone || "—"}</td>
                <td className="p-3 border capitalize">
                  {u.isAdmin ? "Admin" : "Người dùng"}
                </td>

                <td className="p-3 border">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/admin/users/edit/${u._id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Sửa"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(u._id)}
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
        message="Bạn có chắc chắn muốn xoá người dùng này không?"
      />

      <ConfirmModal
        isOpen={isConfirmDeleteManyOpen}
        onClose={() => setIsConfirmDeleteManyOpen(false)}
        onConfirm={confirmDeleteMany}
        title="Xác nhận xoá nhiều"
        message="Bạn có chắc chắn muốn xoá các người dùng đã chọn?"
      />
    </div>
  );
};

export default AdminUser;
