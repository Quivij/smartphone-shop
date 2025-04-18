const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
} = require("../controllers/productController");

// ✅ Lấy danh sách sản phẩm (Hỗ trợ tìm kiếm, lọc, phân trang)
router.get("/", getAllProducts);

// ✅ Lấy thông tin sản phẩm theo ID
router.get("/:id", getProductById);

// ✅ Thêm sản phẩm mới (Chỉ Admin + Upload ảnh)
router.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.array("images", 5),
  createProduct
);

// ✅ Cập nhật sản phẩm (Chỉ Admin + Upload ảnh)
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  upload.array("images", 5),
  updateProduct
);

// ✅ Xóa sản phẩm (Chỉ Admin)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-many", authMiddleware, isAdmin, deleteManyProducts);

module.exports = router;
