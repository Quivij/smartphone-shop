import { useLogout } from "../../hooks/useLogout";
import { useUserStore } from "../../store/useUserStore";

const AdminHeader = () => {
  const { handleLogout } = useLogout();
  const { user } = useUserStore();

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3">
      <div className="text-lg font-semibold text-gray-700">Trang tổng quan</div>
      <div className="flex items-center space-x-4">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="Admin Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        {/* Thêm email vào đây */}
        <span className="text-gray-700 text-sm">{user?.email}</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
