import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { useLogin } from "../hooks/useLogin";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    loading,
    error,
    successMessage,
    handleLogin,
    handleGoogleLogin,
    handleFacebookLogin,
  } = useLogin();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    const success = await handleLogin({ email, password });

    if (success) {
      toast.success(successMessage || "Đăng nhập thành công!");
      navigate("/"); // Chuyển hướng đến trang chủ sau khi đăng nhập
    } else {
      toast.error(error || "Đăng nhập thất bại");
    }
  };

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

        {/* Đăng nhập với Google và Facebook */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 w-full mb-2"
          >
            <FcGoogle className="mr-2 text-xl" />
            Đăng nhập với Google
          </button>
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 w-full"
          >
            <FaFacebookF className="mr-2 text-xl" />
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
