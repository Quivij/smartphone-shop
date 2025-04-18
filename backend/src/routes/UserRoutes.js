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
  createUser,
  getAllUsersRaw,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// Route kiểm tra trạng thái API
router.get("/status", (req, res) => {
  res.json({ message: "API đang hoạt động" });
});

// Định nghĩa API đăng ký
router.post("/register", registerUser);

// Định nghĩa API đăng nhập
router.post("/login", loginUser);

// Định nghĩa API refresh token
router.post("/refresh", refreshToken);

// Đăng xuất
router.post("/logout", logoutUser);

// Route lấy thông tin người dùng của chính mình
router.get("/profile", authMiddleware, getMyProfile);

// Route lấy tất cả người dùng (chỉ admin mới có quyền)
router.get("/", authMiddleware, isAdmin, getAllUsers);

// Route lấy thông tin chi tiết của một user (admin mới có quyền)
router.get("/:userId", authMiddleware, isAdmin, getUserDetail);

// Cập nhật thông tin người dùng (dành cho người dùng đăng nhập hoặc admin)
router.put("/profile", authMiddleware, upload.single("avatar"), updateUser);

// Route admin cập nhật thông tin người dùng khác (Cập nhật bất kỳ user nào)
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  upload.single("avatar"),
  updateUser
);

// Xóa người dùng (Chỉ dành cho admin)
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

// Xóa người dùng của chính mình (Dành cho người dùng đăng nhập)
router.delete("/delete", authMiddleware, deleteUser);
router.post("/", authMiddleware, isAdmin, createUser);
// routes/userRoutes.js
router.get("/all", getAllUsersRaw);

module.exports = router;
