import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { useLogin } from "../hooks/useLogin"; // Hook cho đăng nhập thường
import { useGoogleLoginMutation } from "../hooks/useGoogleLoginMutation"; // Hook mới cho Google
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useGoogleLogin as useGoogleOAuthLogin } from "@react-oauth/google"; // Đổi tên để tránh nhầm lẫn

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. SỬ DỤNG CÁC HOOK MỚI
  // Hook cho đăng nhập bằng email/password
  const { mutate: login, isLoading, isError, error } = useLogin();
  // Hook cho đăng nhập bằng Google
  const { mutate: loginWithGoogle } = useGoogleLoginMutation();

  // Điền sẵn email nếu được redirect từ lỗi Google Login
  useEffect(() => {
    if (location.state?.emailFromGoogle) {
      setEmail(location.state.emailFromGoogle);
      toast.info("Vui lòng nhập mật khẩu của bạn để tiếp tục.");
    }
  }, [location.state]);

  // 2. ĐƠN GIẢN HÓA HÀM ONSUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    // Chỉ cần gọi hàm mutate. Mọi logic xử lý đã nằm trong hook.
    login(
      { email, password },
      {
        onSuccess: () => {
          // Điều hướng là một side-effect của component, xử lý ở đây là hợp lý
          navigate("/");
        },
      }
    );
  };

  // 3. ĐƠN GIẢN HÓA GOOGLE LOGIN
  const handleGoogleLogin = useGoogleOAuthLogin({
    onSuccess: (response) => {
      // Chỉ cần gọi mutate với token. Mọi logic đã nằm trong hook `useGoogleLoginMutation`
      loginWithGoogle(response.access_token, {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error) => {
          const message = error.response?.data?.message || "";
          const emailFromGoogle = error.response?.data?.email;
          if (message.includes("Tài khoản đã tồn tại")) {
            // Chờ toast hiển thị rồi mới navigate
            setTimeout(() => {
              navigate("/login", { state: { emailFromGoogle } });
            }, 500);
          }
        },
      });
    },
    onError: (error) => {
      console.error("Google OAuth Error:", error);
      toast.error("Đăng nhập Google thất bại");
    },
    flow: "implicit",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Đăng Nhập
        </h2>

        <form onSubmit={onSubmit} className="mt-6">
          {/* Hiển thị lỗi từ hook React Query */}
          {isError && (
            <p className="text-red-500 text-sm mb-2 text-center">
              {error.response?.data?.message}
            </p>
          )}

          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            required
          />
          <InputField
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
          />

          {/* Sử dụng isLoading từ hook */}
          <Button
            disabled={isLoading}
            text={isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
          />
        </form>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 py-2 rounded hover:bg-gray-100 transition w-full"
          >
            <FcGoogle size={20} />
            Đăng nhập với Google
          </button>
          <button
            // onClick={handleFacebookLogin} // Sẽ cần logic tương tự cho Facebook
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition w-full"
          >
            <FaFacebookF size={18} />
            Đăng nhập với Facebook
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
