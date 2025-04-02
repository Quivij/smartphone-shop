const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/UserController");
router.get("/", (req, res) => {
  res.json({ message: "API đang hoạt động" });
});

// Định nghĩa API đăng ký
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
