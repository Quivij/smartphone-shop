"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/userController'),
  loginWithGoogle = _require.loginWithGoogle;

// Google OAuth login
router.post('/google', loginWithGoogle);

// Facebook OAuth login
router.post('/facebook', function (req, res) {
  // Facebook login implementation
});
module.exports = router;