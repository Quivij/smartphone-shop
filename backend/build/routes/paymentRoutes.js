"use strict";

var express = require("express");
var router = express.Router();
var paymentController = require("../controllers/paymentController");
router.post("/momo", paymentController.createMomoPayment);
module.exports = router;