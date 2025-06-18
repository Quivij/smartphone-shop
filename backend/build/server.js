"use strict";

var app = require("./app"); // Import app từ file app.js

var PORT = process.env.PORT || 3001;
console.log("gg id", process.env.VITE_GOOGLE_CLIENT_ID);
app.listen(PORT, function () {
  console.log("\uD83D\uDE80 Server \u0111ang ch\u1EA1y tr\xEAn c\u1ED5ng ".concat(PORT));
});