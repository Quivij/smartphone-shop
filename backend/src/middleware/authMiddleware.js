const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Vui lòng đăng nhập để tiếp tục" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin }; // ✅ tốt hơn
    next();
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(403).json({ message: "Bạn không có quyền truy cập" });
  }
};

module.exports = { authMiddleware, isAdmin };
