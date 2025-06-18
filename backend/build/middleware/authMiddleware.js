"use strict";

var jwt = require("jsonwebtoken");
var authMiddleware = function authMiddleware(req, res, next) {
  var _req$header;
  var token = (_req$header = req.header("Authorization")) === null || _req$header === void 0 ? void 0 : _req$header.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      message: "Vui lòng đăng nhập để tiếp tục"
    });
  }
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin
    }; // Gán thông tin người dùng từ token vào request

    next(); // Tiến hành tiếp tục qua các middleware hoặc route handler
  } catch (error) {
    console.error("Token verification failed:", error); // Log lỗi chi tiết để dễ debug
    res.status(401).json({
      message: "Token không hợp lệ"
    });
  }
};
var isAdmin = function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next(); // Nếu là admin, tiếp tục thực hiện action
  } else {
    return res.status(403).json({
      message: "Bạn không có quyền truy cập"
    }); // Nếu không phải admin, trả về lỗi
  }
};
module.exports = {
  authMiddleware: authMiddleware,
  isAdmin: isAdmin
};