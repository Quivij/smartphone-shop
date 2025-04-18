const fs = require("fs");
const path = require("path");

// Đảm bảo rằng thư mục uploads/products tồn tại
const createFolderIfNotExist = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
  }
};

// Trước khi lưu tệp ảnh, hãy tạo thư mục nếu nó chưa tồn tại
const uploadDirectory = path.join(__dirname, "../uploads/products");
createFolderIfNotExist(uploadDirectory);

// Phần mã upload của bạn
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Đảm bảo sử dụng đường dẫn đúng
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${Math.floor(Math.random() * 100000000)}.${
      file.mimetype.split("/")[1]
    }`;
    cb(null, filename); // Đặt tên cho tệp
  },
});

const upload = multer({ storage });

module.exports = upload;
