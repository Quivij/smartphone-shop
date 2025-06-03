// import { useState } from "react";
// import axios from "axios";
// import { useUserStore } from "../store/useUserStore"; // Zustand store của bạn

// axios.defaults.withCredentials = true; // Nếu dùng cookie từ backend

// export const useLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   const { setUser } = useUserStore(); // Lưu user vào state

//   const handleLogin = async ({ email, password }) => {
//     setLoading(true);
//     setError(null);
//     setSuccessMessage(null);

//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/log-in", {
//         email,
//         password,
//       });

//       // Giả sử backend trả về user trong response.data.user
//       const userData = response.data.user;
//       setUser(userData); // Lưu vào Zustand store

//       setSuccessMessage("Đăng nhập thành công");
//       return true;
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.response?.data?.message || "Có lỗi xảy ra khi đăng nhập");
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     error,
//     successMessage,
//     handleLogin,
//   };
// };
