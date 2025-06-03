const Product = require("../models/Product");
const slugify = require("slugify");

class ProductService {
  async createProduct(productData, uploadedImages) {
    const { name, description, brand, category, specifications, variants } = productData;

    // Parse if string (when sent from form-data)
    const parsedSpecs = typeof specifications === "string" ? JSON.parse(specifications) : specifications;
    const parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;

    // Validate required fields
    const requiredFields = ["name", "description", "brand", "category"];
    for (let field of requiredFields) {
      if (!productData[field]) {
        throw new Error(`${field} is required`);
      }
    }

    // Handle image paths
    let imagePaths = uploadedImages.map(file => `/uploads/products/${file.filename}`);

    // Assign images to variants
    if (Array.isArray(parsedVariants)) {
      parsedVariants.forEach(variant => {
        const numImages = variant.images?.length || 0;
        const assignedImages = imagePaths.splice(0, numImages);
        variant.images = assignedImages;
      });
    }

    // Generate unique slug
    let baseSlug = slugify(name, { lower: true });
    let slug = baseSlug;
    let count = 1;

    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const product = new Product({
      name,
      slug,
      description,
      brand,
      category,
      specifications: parsedSpecs,
      variants: parsedVariants,
    });

    return await product.save();
  }

  async getProducts(filters, pagination) {
    const { page = 1, limit = 10 } = pagination;
    const { category, brand, minPrice, maxPrice, search } = filters;

    let filter = {};

    if (category) filter.category = category;
    if (brand && brand !== "all") {
      filter.brand = { $regex: `^${brand}$`, $options: "i" };
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (minPrice || maxPrice) {
      filter.finalPrice = {};
      if (minPrice) filter.finalPrice.$gte = Number(minPrice);
      if (maxPrice) filter.finalPrice.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
      .select("name price finalPrice category brand images variants")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    return {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products,
    };
  }

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async updateProduct(id, productData, uploadedImages) {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    let { name, description, brand, category, specifications, variants } = productData;

    // Parse if string
    if (typeof specifications === "string") {
      try {
        specifications = JSON.parse(specifications);
      } catch (err) {
        throw new Error("Invalid specifications format");
      }
    }

    if (typeof variants === "string") {
      try {
        variants = JSON.parse(variants);
      } catch (err) {
        throw new Error("Invalid variants format");
      }
    }

    // Update basic info
    if (name) product.name = name;
    if (description) product.description = description;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (specifications) product.specifications = specifications;

    // Handle variant images
    if (variants && Array.isArray(variants)) {
      let imagePaths = uploadedImages.map(file => `/uploads/products/${file.filename}`);

      variants = variants.map(variant => {
        const numImages = variant.images?.length || 0;
        const assignedImages = imagePaths.splice(0, numImages);
        return {
          ...variant,
          images: assignedImages,
        };
      });

      product.variants = variants;
    }

    return await product.save();
  }

  async deleteProduct(id) {
    const result = await Product.findByIdAndDelete(id);
    if (!result) throw new Error("Product not found");
    return result;
  }

  async addRating(productId, ratingData) {
    const { rating, comment, userId } = ratingData;
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    product.ratings.push({ userId, rating, comment });
    await product.calculateAverageRating();
    return product;
  }

  async searchProducts(query) {
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    }).select("name variants");

    return products.map(p => {
      const firstVariant = p.variants && p.variants[0] ? p.variants[0] : {};
      return {
        _id: p._id,
        name: `${p.name} ${firstVariant.storage || ""} - Chính hãng VN/A`,
        price: firstVariant.price || p.price || 0,
        image: firstVariant.images?.[0] || p.images?.[0] || "",
      };
    });
  }
}

module.exports = new ProductService(); 