import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "../store/useUserStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useUserStore(state => state.logout);

  const handleLogout = async () => {
    try {
      // Call logout from the store
      logout();

      // Show success message
      toast.success("Đăng xuất thành công!");

      // Navigate to login page
      navigate("/login");
    } catch (err) {
      // Handle logout error
      const errorMessage = err.response?.data?.message || "Đăng xuất thất bại";
      toast.error(errorMessage);
    }
  };

  return { handleLogout };
};
