import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook điều hướng

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }
    console.log("Đăng nhập với:", { email, password });
    navigate("/dashboard"); // Chuyển hướng sau khi đăng nhập thành công
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Đăng Nhập
        </h2>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form onSubmit={handleLogin} className="mt-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
          />
          <InputField
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
          <Button text="Đăng Nhập" />
        </form>

        {/* Quên mật khẩu */}
        <div className="text-right mt-2">
          <span
            className="text-blue-500 text-sm cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Quên mật khẩu?
          </span>
        </div>

        {/* Nút đăng nhập Google & Facebook */}
        <div className="mt-4 flex flex-col gap-2">
          <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white p-2 rounded-md">
            <img src="" alt="Google" className="w-5 h-5" />
            Đăng nhập bằng Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded-md">
            <img src="" alt="Facebook" className="w-5 h-5" />
            Đăng nhập bằng Facebook
          </button>
        </div>

        {/* Điều hướng đến trang đăng ký */}
        <p className="mt-4 text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
