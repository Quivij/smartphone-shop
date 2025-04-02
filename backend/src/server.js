const app = require("./app"); // Import app từ file app.js

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
});
