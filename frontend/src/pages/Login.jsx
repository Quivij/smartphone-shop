import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { useLogin } from "../hooks/useLogin";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../api/api";
import { useUserStore } from "../store/useUserStore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, successMessage, handleLogin } = useLogin();
  const { setUser } = useUserStore();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    const success = await handleLogin({ email, password });

    if (success) {
      toast.success(successMessage || "Đăng nhập thành công!");
      navigate("/");
    } else {
      toast.error(error || "Đăng nhập thất bại");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const result = await api.post("/auth/google", {
          token: response.access_token,
        });

        localStorage.setItem("token", result.data.accessToken);
        setUser(result.data.user);
        toast.success("Đăng nhập Google thành công!");
        navigate("/");
      } catch (error) {
        const message =
          error.response?.data?.message || "Đăng nhập Google thất bại";
        const emailFromGoogle = error.response?.data?.email;

        toast.error(message);

        // Chờ toast hiển thị xong trước khi redirect
        setTimeout(() => {
          if (message.includes("Tài khoản đã tồn tại")) {
            navigate("/login", {
              state: { emailFromGoogle },
            });
          }
        }, 300);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error("Đăng nhập Google thất bại");
    },
    flow: "implicit",
  });

  // const handleFacebookLogin = () => {
  //   window.location.href = `http://localhost:3001/auth/facebook`;
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Đăng Nhập
        </h2>

        <form onSubmit={onSubmit} className="mt-6">
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mt-2">{successMessage}</p>
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

          <Button text={loading ? "Đang đăng nhập..." : "Đăng Nhập"} />
        </form>

        {/* OAuth Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => handleGoogleLogin()}
            className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            Đăng nhập với Google
          </button>

          <button
            onClick={handleGoogleLogin}
            // onClick={handleFacebookLogin}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            <FaFacebookF size={18} />
            Đăng nhập với Facebook
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
