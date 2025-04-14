const multer = require("multer");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const path = require("path");

const {
  registerUser,
  loginUser,
  updateUser,
  getUserInfo,
  deleteUser,
  getAllUsers,
  getUserDetail,
  refreshToken,
  logoutUser,
  getMyProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.get("/status", (req, res) => {
  res.json({ message: "API đang hoạt động" });
});

// Định nghĩa API đăng ký
router.post("/register", registerUser);

// Định nghĩa API đăng nhập
router.post("/login", loginUser);

// Cập nhật thông tin người dùng (Cập nhật thông tin của chính mình)
router.put("/update", authMiddleware, updateUser);

// Lấy thông tin người dùng (Thông tin của chính mình)
// router.get("/me", authMiddleware, getUserInfo);

// Quản lý người dùng (Admin)

router.delete("/delete", authMiddleware, deleteUser);

// API refresh token
router.post("/refresh", refreshToken);

// Đăng xuất
router.post("/logout", logoutUser);
router.get("/profile", authMiddleware, getMyProfile);
router.get("/:userId", authMiddleware, isAdmin, getUserDetail);
router.put(
  "/profile",
  authMiddleware, // Xác thực người dùng
  upload.single("avatar"), // Upload avatar nếu có
  updateUserProfile // Cập nhật thông tin
);

module.exports = router;
