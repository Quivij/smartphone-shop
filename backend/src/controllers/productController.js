const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const { sort, filter, page = 1, limit = 10 } = req.query;

    // Khởi tạo filter và sort options mặc định
    let filterOptions = {};
    let sortOptions = {};

    // Nếu có tham số filter (ví dụ lọc theo category, price range)
    if (filter) {
      const filterParams = filter.split(",");
      filterParams.forEach((param) => {
        const [key, value] = param.split(":");
        filterOptions[key] = value;
      });
    }

    // Nếu có tham số sort, xử lý sắp xếp
    if (sort) {
      if (sort === "price_asc") {
        sortOptions = { price: 1 }; // Sắp xếp giá tăng dần
      } else if (sort === "price_desc") {
        sortOptions = { price: -1 }; // Sắp xếp giá giảm dần
      } else if (sort === "name_asc") {
        sortOptions = { name: 1 }; // Sắp xếp tên theo thứ tự tăng dần
      } else if (sort === "name_desc") {
        sortOptions = { name: -1 }; // Sắp xếp tên theo thứ tự giảm dần
      }
    }

    // Tính toán các chỉ số phân trang
    const skip = (page - 1) * limit;

    // Truy vấn sản phẩm với các filter, sort và phân trang
    const products = await Product.find(filterOptions)
      .sort(sortOptions)
      .skip(skip) // Bỏ qua các sản phẩm đã chọn
      .limit(Number(limit)); // Giới hạn số lượng sản phẩm trong mỗi trang

    // Truy vấn tổng số sản phẩm để tính tổng trang
    const totalProducts = await Product.countDocuments(filterOptions);

    // Tính số trang
    const totalPages = Math.ceil(totalProducts / limit);

    // Trả về kết quả với thông tin phân trang
    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
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

// ✅ Thêm sản phẩm mới (Chỉ Admin)
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      image,
    });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ✅ Cập nhật sản phẩm (Chỉ Admin)
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
