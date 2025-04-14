import { useState } from "react";
import { loginUser } from "../api/auth";
import { useUserStore } from "../store/useUserStore"; // Import store để cập nhật trạng thái người dùng
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const setUser = useUserStore((state) => state.setUser); // ✅ lấy function setUser từ store

  const handleLogin = async ({ email, password }) => {
    setError("");
    setSuccessMessage("");

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return false;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user); // ✅ cập nhật Zustand store khi login thành công

      setSuccessMessage(data.message);

      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Đăng nhập thất bại";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, successMessage, handleLogin };
};
