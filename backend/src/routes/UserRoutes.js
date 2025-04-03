const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getUserInfo,
  deleteUser,
  getAllUsers,
  getUserDetail,
} = require("../controllers/UserController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.get("/status", (req, res) => {
  res.json({ message: "API đang hoạt động" });
});

// Định nghĩa API đăng ký
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", authMiddleware, updateUser);
router.get("/me", authMiddleware, getUserInfo);
router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/:userId", authMiddleware, getUserDetail);
router.delete("/delete", authMiddleware, deleteUser);
module.exports = router;
