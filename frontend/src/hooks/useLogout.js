import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import { toast } from "react-toastify";
import { useUserStore } from "../store/useUserStore"; // Import useUserStore để sử dụng trạng thái người dùng

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore(); // Lấy phương thức setUser từ Zustand store

  const handleLogout = async () => {
    try {
      // Gọi API logout
      await logoutUser();

      // Xóa token và thông tin người dùng khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Cập nhật trạng thái user trong store về null
      setUser(null); // Đặt lại user thành null trong Zustand store

      // Hiển thị thông báo đăng xuất thành công
      toast.success("Đăng xuất thành công!");

      // Điều hướng về trang đăng nhập
      navigate("/login");
    } catch (err) {
      // Xử lý lỗi khi logout
      const errorMessage = err.response?.data?.message || "Đăng xuất thất bại";
      toast.error(errorMessage); // Hiển thị thông báo lỗi
    }
  };

  return { handleLogout };
};
