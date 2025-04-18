const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoutes");
const path = require("path");

// Load biến môi trường từ file .env
dotenv.config();

// Kết nối MongoDB
connectDB();

// Khởi tạo ứng dụng Express
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL của bạn
    methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức HTTP được phép
    allowedHeaders: ["Content-Type", "Authorization"], // Các headers cho phép
    credentials: true, // Cho phép gửi cookie kèm theo yêu cầu
  })
);

app.use(express.json()); // Xử lý dữ liệu JSON từ request
app.use(morgan("dev")); // Ghi log request

// Định nghĩa các routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware xử lý lỗi
app.use(errorHandler);

module.exports = app;
