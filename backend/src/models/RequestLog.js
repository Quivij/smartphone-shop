const mongoose = require("mongoose");

const requestLogSchema = new mongoose.Schema({
  ip: String,
  path: String,
  timestamp: { type: Date, default: Date.now },
  keyword: String,
});

module.exports = mongoose.model("RequestLog", requestLogSchema);
