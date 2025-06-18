"use strict";

var fs = require("fs");
var path = require("path");
var multer = require("multer");

// Đảm bảo thư mục avatars tồn tại
var avatarDirectory = path.join(__dirname, "../uploads/avatars");
if (!fs.existsSync(avatarDirectory)) {
  fs.mkdirSync(avatarDirectory, {
    recursive: true
  });
}

// Cấu hình lưu trữ cho avatar
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, avatarDirectory);
  },
  filename: function filename(req, file, cb) {
    var ext = file.mimetype.split("/")[1];
    var filename = "".concat(Date.now(), "-").concat(Math.floor(Math.random() * 1e8), ".").concat(ext);
    cb(null, filename);
  }
});
var uploadAvatar = multer({
  storage: storage
});
module.exports = uploadAvatar;