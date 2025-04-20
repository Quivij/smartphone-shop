const Product = require("../models/Product");
const path = require("path");

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      brand,
      category,
      specifications,
      variants,
    } = req.body;

    // Parse các trường JSON nếu là string
    if (typeof specifications === "string") {
      specifications = JSON.parse(specifications);
    }

    if (typeof variants === "string") {
      variants = JSON.parse(variants);
    }

    // Kiểm tra các trường bắt buộc
    const requiredFields = [
      "name",
      "description",
      "price",
      "brand",
      "category",
    ];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Xử lý ảnh nếu có
    const uploadedImages = req.files || [];
    let imagePaths = uploadedImages.map(
      (file) => `/uploads/products/${file.filename}`
    );

    // Gán ảnh vào từng variant nếu cần
    if (variants && Array.isArray(variants)) {
      variants.forEach((variant, index) => {
        variant.images = variant.images || []; // fallback nếu không có
        variant.images = imagePaths.splice(0, variant.images.length); // gán đúng số ảnh
      });
    }

    const product = new Product({
      name,
      description,
      price,
      brand,
      category,
      specifications,
      variants,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Lỗi tạo sản phẩm:", err);
    res.status(400).json({ error: err.message });
  }
};

// Lấy danh sách sản phẩm (có thể lọc theo category, brand, search)
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      brand,
      minPrice,
      maxPrice,
      search,
    } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (search) filter.name = { $regex: search, $options: "i" };
    if (minPrice || maxPrice) {
      filter.finalPrice = {};
      if (minPrice) filter.finalPrice.$gte = Number(minPrice);
      if (maxPrice) filter.finalPrice.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy chi tiết sản phẩm
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật sản phẩm
// Cập nhật sản phẩm và ảnh
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });

    let {
      name,
      description,
      price,
      brand,
      category,
      variants,
      specifications,
    } = req.body;

    // ✅ Parse specifications nếu là string (do FormData gửi lên)
    if (typeof specifications === "string") {
      try {
        specifications = JSON.parse(specifications);
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Trường specifications không hợp lệ" });
      }
    }

    // ✅ Parse variants nếu là string
    if (typeof variants === "string") {
      try {
        variants = JSON.parse(variants);
      } catch (err) {
        return res.status(400).json({ error: "Trường variants không hợp lệ" });
      }
    }

    // ✅ Cập nhật thông tin nếu có
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (specifications) product.specifications = specifications;

    if (variants) {
      const uploadedImages = req.files || [];
      let imagePaths = uploadedImages.map(
        (file) => `/uploads/products/${file.filename}`
      );

      // Gán ảnh vào đúng variant
      variants.forEach((variant) => {
        variant.images = imagePaths.splice(0, variant.images.length);
      });

      product.variants = variants;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Lỗi update sản phẩm:", err);
    res.status(500).json({ error: "Lỗi cập nhật sản phẩm" });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa sản phẩm" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm đánh giá sản phẩm
exports.addRating = async (req, res) => {
  try {
    const { rating, comment, userId } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

    product.ratings.push({ userId, rating, comment });
    await product.calculateAverageRating();
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      brand,
      minPrice,
      maxPrice,
      search,
    } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (search) filter.name = { $regex: search, $options: "i" };
    if (minPrice || maxPrice) {
      filter.finalPrice = {};
      if (minPrice) filter.finalPrice.$gte = Number(minPrice);
      if (maxPrice) filter.finalPrice.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
