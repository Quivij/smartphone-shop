"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../controllers/dashboardController"),
  getDashboardStats = _require.getDashboardStats;
var _require2 = require("../middleware/authMiddleware"),
  authMiddleware = _require2.authMiddleware,
  isAdmin = _require2.isAdmin;
router.get("/", authMiddleware, isAdmin, getDashboardStats);
module.exports = router;