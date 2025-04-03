const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Vui lòng đăng nhập để tiếp tục" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Gắn thông tin người dùng từ token vào req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

// Middleware kiểm tra quyền Admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next(); // Nếu là admin, tiếp tục xử lý yêu cầu
  } else {
    return res.status(403).json({ message: "Bạn không có quyền truy cập" });
  }
};

module.exports = { authMiddleware, isAdmin };
