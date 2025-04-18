import { useState } from "react";
import { loginUser } from "../api/auth";
import { useUserStore } from "../store/useUserStore"; // Import store để cập nhật trạng thái người dùng

// Helper function để format avatar URL
const formatAvatarUrl = (avatar) => {
  if (!avatar) return "/default-avatar.png"; // Avatar mặc định nếu không có ảnh
  return avatar.startsWith("http") ? avatar : `http://localhost:3001${avatar}`;
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const setUser = useUserStore((state) => state.setUser); // Lấy function setUser từ store

  const handleLogin = async ({ email, password }) => {
    setError("");
    setSuccessMessage("");

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return false;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });

      // Đảm bảo avatar URL được xử lý chính xác
      const userWithAvatar = {
        ...data.user,
        avatar: formatAvatarUrl(data.user.avatar), // Chỉnh sửa avatar nếu cần
      };

      // Lưu token và user đã xử lý avatar vào localStorage
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(userWithAvatar));

      // Cập nhật trạng thái user trong Zustand store
      setUser(userWithAvatar);

      setSuccessMessage(data.message || "Đăng nhập thành công.");

      return true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, successMessage, handleLogin };
};
