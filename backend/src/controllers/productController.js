const Product = require("../models/Product");
const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {
  try {
    const {
      sort,
      filter,
      page = 1,
      limit = 10,
      search = "",
      stock,
    } = req.query;

    let filterOptions = {};
    let sortOptions = {};

    // Lọc theo stock (có thể tùy chỉnh để tìm sản phẩm còn hàng hoặc hết hàng)
    if (stock === "in") {
      filterOptions["colors.stock"] = { $gt: 0 }; // Còn hàng
    } else if (stock === "out") {
      filterOptions["colors.stock"] = { $lte: 0 }; // Hết hàng
    }

    // Tìm kiếm theo tên sản phẩm
    if (search) {
      filterOptions.name = { $regex: search, $options: "i" };
    }

    // Xử lý các tham số filter
    if (filter) {
      const filterParams = filter.split(",");
      filterParams.forEach((param) => {
        const [key, value] = param.split(":");
        if (key && value) {
          filterOptions[key] = value;
        }
      });
    }

    // Sắp xếp sản phẩm
    if (sort === "price_asc") sortOptions.price = 1;
    else if (sort === "price_desc") sortOptions.price = -1;
    else if (sort === "name_asc") sortOptions.name = 1;
    else if (sort === "name_desc") sortOptions.name = -1;
    else if (sort === "created_asc") sortOptions.createdAt = 1;
    else if (sort === "created_desc") sortOptions.createdAt = -1;

    const skip = (page - 1) * limit;

    const products = await Product.find(filterOptions)
      .sort(sortOptions)
      .skip(Number(skip))
      .limit(Number(limit));

    // Tính tổng số lượng tồn kho và thêm thông tin tồn kho theo màu cho mỗi sản phẩm
    const productsWithStockDetails = products.map((product) => {
      const totalStock = product.colors.reduce(
        (sum, color) => sum + color.stock,
        0
      );
      const colorDetails = product.colors.map((color) => ({
        colorName: color.colorName,
        stock: color.stock,
      }));

      return {
        ...product.toObject(),
        totalStock,
        colorDetails,
      };
    });

    const totalProducts = await Product.countDocuments(filterOptions);
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      products: productsWithStockDetails,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm" });
  }
};

// ✅ Lấy thông tin sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const createProduct = async (req, res) => {
  try {
    const images = req.files.map(
      (file) => `/uploads/products/${file.filename}`
    );

    const newProduct = new Product({
      ...req.body,
      images,
      specifications: JSON.parse(req.body.specifications || "{}"),
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Tạo sản phẩm thất bại", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const images = req.files?.map(
      (file) => `/uploads/products/${file.filename}`
    );

    const updateData = {
      ...req.body,
      specifications: JSON.parse(req.body.specifications || "{}"),
    };

    if (images?.length > 0) {
      updateData.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Cập nhật thất bại", error });
  }
};

// ✅ Xóa sản phẩm (Chỉ Admin)
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json({ message: "Sản phẩm đã bị xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// controllers/productController.js

const deleteManyProducts = async (req, res) => {
  try {
    console.log("DELETE /delete-many body:", req.body);
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid product IDs" });
    }

    const result = await Product.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Deleted successfully", result });
  } catch (error) {
    console.error("Error in deleteManyProducts:", error); // << GHI LẠI LỖI CHI TIẾT
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
};
