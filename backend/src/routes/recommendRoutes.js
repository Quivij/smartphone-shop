const express = require("express");
const router = express.Router();
const { getRecommendations } = require("../controllers/recommendController");

// Định nghĩa route
router.get("/:userId", getRecommendations);

module.exports = router; // ✅ Xuất router đúng cách
