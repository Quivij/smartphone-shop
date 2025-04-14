const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ✅ Lấy danh sách sản phẩm (Hỗ trợ tìm kiếm, lọc, phân trang)
router.get("/", getAllProducts);

// ✅ Lấy thông tin sản phẩm theo ID
router.get("/:id", getProductById);

// ✅ Thêm sản phẩm mới (Chỉ Admin)
router.post("/", authMiddleware, isAdmin, createProduct);

// ✅ Cập nhật sản phẩm (Chỉ Admin)
router.put("/:id", authMiddleware, isAdmin, updateProduct);

// ✅ Xóa sản phẩm (Chỉ Admin)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
