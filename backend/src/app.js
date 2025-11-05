const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser"); // 1. IMPORT COOKIE-PARSER
const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoute = require("./routes/dashboardRoute");
const couponRoutes = require("./routes/couponRoutes");
const session = require("express-session");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const recommenderRoutes = require("./routes/recommendRoutes"); // Import routes cho recommender system

// Load biến môi trường từ file .env
dotenv.config();

// Kết nối MongoDB
connectDB();

// Khởi tạo ứng dụng Express
const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:5173",  // cho dev nếu cần
  "http://127.0.0.1:80"
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Cho phép yêu cầu không có origin (ví dụ: curl, mobile app)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "your-secret-key", // Dùng một chuỗi ngẫu nhiên cho bảo mật
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true nếu bạn sử dụng HTTPS
  })
);

app.use(express.json()); // Xử lý dữ liệu JSON từ request
app.use(cookieParser()); // 2. SỬ DỤNG MIDDLEWARE COOKIE-PARSER TẠI ĐÂY
app.use(morgan("dev")); // Ghi log request

// Định nghĩa các routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/coupons", couponRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recommend", recommenderRoutes); // Route cho recommender system
// Middleware xử lý lỗi
app.use(errorHandler);

module.exports = app;
