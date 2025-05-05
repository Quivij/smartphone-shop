const Product = require("../models/Product");
const path = require("path");

const { spawn } = require("child_process");

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    let { name, description, brand, category, specifications, variants } =
      req.body;

    // Parse nếu là string (khi gửi từ form-data)
    if (typeof specifications === "string") {
      specifications = JSON.parse(specifications);
    }

    if (typeof variants === "string") {
      variants = JSON.parse(variants);
    }

    // Kiểm tra các trường bắt buộc
    const requiredFields = ["name", "description", "brand", "category"];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const uploadedImages = req.files || [];
    let imagePaths = uploadedImages.map(
      (file) => `/uploads/products/${file.filename}`
    );

    // Gán ảnh cho từng biến thể đúng cách
    if (Array.isArray(variants)) {
      variants = variants.map((variant) => {
        const numImages = variant.images?.length || 0;
        const assignedImages = imagePaths.splice(0, numImages);

        return {
          color: variant.color,
          storage: variant.storage,
          price: variant.price,
          stock: variant.stock,
          images: assignedImages,
        };
      });
    }

    const product = new Product({
      name,
      description,
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

    // Gửi response mà không lưu vào cache
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    // Tìm sản phẩm
    const products = await Product.find(filter)
      .select("name price finalPrice category brand images") // Chọn các trường cần thiết
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

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });

    let { name, description, brand, category, specifications, variants } =
      req.body;

    // Parse nếu là string
    if (typeof specifications === "string") {
      try {
        specifications = JSON.parse(specifications);
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Trường specifications không hợp lệ" });
      }
    }

    if (typeof variants === "string") {
      try {
        variants = JSON.parse(variants);
      } catch (err) {
        return res.status(400).json({ error: "Trường variants không hợp lệ" });
      }
    }

    // Cập nhật thông tin cơ bản
    if (name) product.name = name;
    if (description) product.description = description;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (specifications) product.specifications = specifications;

    // Xử lý ảnh cho biến thể (nếu có upload mới)
    if (variants && Array.isArray(variants)) {
      const uploadedImages = req.files || [];
      let imagePaths = uploadedImages.map(
        (file) => `/uploads/products/${file.filename}`
      );

      // Gán ảnh cho từng variant
      variants = variants.map((variant) => {
        const numImages = variant.images?.length || 0;
        const assignedImages = imagePaths.splice(0, numImages);

        return {
          color: variant.color,
          storage: variant.storage,
          price: variant.price,
          stock: variant.stock,
          images: assignedImages, // ảnh mới
        };
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

exports.searchProduct = async (req, res) => {
  const { query } = req.query;
  try {
    console.log("Query received:", query); // Log query để kiểm tra input
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    }).select("name variants");

    console.log("Products found:", products); // Log kết quả từ MongoDB

    const result = products.map((p) => {
      const firstVariant = p.variants && p.variants[0] ? p.variants[0] : {};
      return {
        _id: p._id,
        name: `${p.name} ${firstVariant.storage || ""} - Chính hãng VN/A`,
        price: firstVariant.price || p.price || 0, // Dùng giá mặc định nếu không có variants
        image: firstVariant.images?.[0] || p.images?.[0] || "", // Dùng ảnh mặc định nếu không có variants
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Error in search:", err); // Log lỗi
    res.status(500).json({ error: "Lỗi khi tìm kiếm sản phẩm" });
  }
};
