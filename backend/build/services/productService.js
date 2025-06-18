"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Product = require("../models/Product");
var slugify = require("slugify");
var ProductService = /*#__PURE__*/function () {
  function ProductService() {
    _classCallCheck(this, ProductService);
  }
  return _createClass(ProductService, [{
    key: "createProduct",
    value: function () {
      var _createProduct = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(productData, uploadedImages) {
        var name, description, brand, category, specifications, variants, parsedSpecs, parsedVariants, requiredFields, _i, _requiredFields, field, imagePaths, product;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              name = productData.name, description = productData.description, brand = productData.brand, category = productData.category, specifications = productData.specifications, variants = productData.variants;
              parsedSpecs = typeof specifications === "string" ? JSON.parse(specifications) : specifications;
              parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;
              requiredFields = ["name", "description", "brand", "category"];
              _i = 0, _requiredFields = requiredFields;
            case 1:
              if (!(_i < _requiredFields.length)) {
                _context.n = 3;
                break;
              }
              field = _requiredFields[_i];
              if (productData[field]) {
                _context.n = 2;
                break;
              }
              throw new Error("".concat(field, " is required"));
            case 2:
              _i++;
              _context.n = 1;
              break;
            case 3:
              imagePaths = uploadedImages.map(function (file) {
                return "/uploads/products/".concat(file.filename);
              });
              if (Array.isArray(parsedVariants)) {
                parsedVariants.forEach(function (variant) {
                  var _variant$images;
                  var numImages = ((_variant$images = variant.images) === null || _variant$images === void 0 ? void 0 : _variant$images.length) || 0;
                  var assignedImages = imagePaths.splice(0, numImages);
                  variant.images = assignedImages;
                  if (variant.importPrice !== undefined) {
                    variant.importPrice = Number(variant.importPrice);
                  }
                });
              }

              // Bỏ phần tạo slug thủ công vì schema đã có pre('save')
              product = new Product({
                name: name,
                description: description,
                brand: brand,
                category: category,
                specifications: parsedSpecs,
                variants: parsedVariants
              });
              _context.n = 4;
              return product.save();
            case 4:
              return _context.a(2, _context.v);
          }
        }, _callee);
      }));
      function createProduct(_x, _x2) {
        return _createProduct.apply(this, arguments);
      }
      return createProduct;
    }()
  }, {
    key: "getProducts",
    value: function () {
      var _getProducts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(filters, pagination) {
        var _pagination$page, page, _pagination$limit, limit, category, brand, minPrice, maxPrice, search, filter, products, total;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _pagination$page = pagination.page, page = _pagination$page === void 0 ? 1 : _pagination$page, _pagination$limit = pagination.limit, limit = _pagination$limit === void 0 ? 10 : _pagination$limit;
              category = filters.category, brand = filters.brand, minPrice = filters.minPrice, maxPrice = filters.maxPrice, search = filters.search;
              filter = {};
              if (category) filter.category = category;
              if (brand && brand !== "all") {
                filter.brand = {
                  $regex: "^".concat(brand, "$"),
                  $options: "i"
                };
              }
              if (search) {
                filter.name = {
                  $regex: search,
                  $options: "i"
                };
              }
              if (minPrice || maxPrice) {
                filter["variants.price"] = {};
                if (minPrice) filter["variants.price"].$gte = Number(minPrice);
                if (maxPrice) filter["variants.price"].$lte = Number(maxPrice);
              }
              _context2.n = 1;
              return Product.find(filter).select("name brand category variants specifications sold createdAt updatedAt").skip((page - 1) * limit).limit(Number(limit));
            case 1:
              products = _context2.v;
              _context2.n = 2;
              return Product.countDocuments(filter);
            case 2:
              total = _context2.v;
              return _context2.a(2, {
                total: total,
                page: Number(page),
                pages: Math.ceil(total / limit),
                products: products
              });
          }
        }, _callee2);
      }));
      function getProducts(_x3, _x4) {
        return _getProducts.apply(this, arguments);
      }
      return getProducts;
    }()
  }, {
    key: "getProductById",
    value: function () {
      var _getProductById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
        var product;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return Product.findById(id);
            case 1:
              product = _context3.v;
              if (product) {
                _context3.n = 2;
                break;
              }
              throw new Error("Product not found");
            case 2:
              return _context3.a(2, product);
          }
        }, _callee3);
      }));
      function getProductById(_x5) {
        return _getProductById.apply(this, arguments);
      }
      return getProductById;
    }()
  }, {
    key: "updateProduct",
    value: function () {
      var _updateProduct = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id, productData, uploadedImages) {
        var product, name, description, brand, category, specifications, variants, uploadedImagesCopy, _t, _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return Product.findById(id);
            case 1:
              product = _context4.v;
              if (product) {
                _context4.n = 2;
                break;
              }
              throw new Error("Product not found");
            case 2:
              name = productData.name, description = productData.description, brand = productData.brand, category = productData.category, specifications = productData.specifications, variants = productData.variants;
              if (!(typeof specifications === "string")) {
                _context4.n = 5;
                break;
              }
              _context4.p = 3;
              specifications = JSON.parse(specifications);
              _context4.n = 5;
              break;
            case 4:
              _context4.p = 4;
              _t = _context4.v;
              throw new Error("Invalid specifications format");
            case 5:
              if (!(typeof variants === "string")) {
                _context4.n = 8;
                break;
              }
              _context4.p = 6;
              variants = JSON.parse(variants);
              _context4.n = 8;
              break;
            case 7:
              _context4.p = 7;
              _t2 = _context4.v;
              throw new Error("Invalid variants format");
            case 8:
              if (name) product.name = name;
              if (description) product.description = description;
              if (brand) product.brand = brand;
              if (category) product.category = category;
              if (specifications) product.specifications = specifications;
              if (variants && Array.isArray(variants)) {
                uploadedImagesCopy = _toConsumableArray(uploadedImages); // copy tránh mutate mảng gốc
                variants = variants.map(function (variant) {
                  var newImages = [];
                  if (variant.images && variant.images.length > 0) {
                    if (typeof variant.images[0] === "string") {
                      // ảnh cũ
                      newImages = variant.images;
                    } else {
                      // ảnh mới upload
                      var numImages = variant.images.length;
                      newImages = uploadedImagesCopy.splice(0, numImages).map(function (file) {
                        return "/uploads/products/".concat(file.filename);
                      });
                    }
                  }
                  return _objectSpread(_objectSpread({}, variant), {}, {
                    images: newImages,
                    importPrice: variant.importPrice !== undefined ? Number(variant.importPrice) : variant.importPrice
                  });
                });
                product.variants = variants;
              }
              _context4.n = 9;
              return product.save();
            case 9:
              return _context4.a(2, _context4.v);
          }
        }, _callee4, null, [[6, 7], [3, 4]]);
      }));
      function updateProduct(_x6, _x7, _x8) {
        return _updateProduct.apply(this, arguments);
      }
      return updateProduct;
    }()
  }, {
    key: "deleteProduct",
    value: function () {
      var _deleteProduct = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(id) {
        var result;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return Product.findByIdAndDelete(id);
            case 1:
              result = _context5.v;
              if (result) {
                _context5.n = 2;
                break;
              }
              throw new Error("Product not found");
            case 2:
              return _context5.a(2, result);
          }
        }, _callee5);
      }));
      function deleteProduct(_x9) {
        return _deleteProduct.apply(this, arguments);
      }
      return deleteProduct;
    }()
  }, {
    key: "addRating",
    value: function () {
      var _addRating = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(productId, ratingData) {
        var rating, comment, userId, product;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              rating = ratingData.rating, comment = ratingData.comment, userId = ratingData.userId;
              _context6.n = 1;
              return Product.findById(productId);
            case 1:
              product = _context6.v;
              if (product) {
                _context6.n = 2;
                break;
              }
              throw new Error("Product not found");
            case 2:
              product.ratings.push({
                userId: userId,
                rating: rating,
                comment: comment
              });
              _context6.n = 3;
              return product.save();
            case 3:
              return _context6.a(2, _context6.v);
          }
        }, _callee6);
      }));
      function addRating(_x0, _x1) {
        return _addRating.apply(this, arguments);
      }
      return addRating;
    }()
  }, {
    key: "searchProducts",
    value: function () {
      var _searchProducts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(query) {
        var products;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return Product.find({
                name: {
                  $regex: query,
                  $options: "i"
                }
              }).select("name variants");
            case 1:
              products = _context7.v;
              return _context7.a(2, products.map(function (p) {
                var _firstVariant$images;
                var firstVariant = p.variants && p.variants[0] ? p.variants[0] : {};
                return {
                  _id: p._id,
                  name: "".concat(p.name, " ").concat(firstVariant.storage || "", " - Ch\xEDnh h\xE3ng VN/A"),
                  price: firstVariant.price || 0,
                  image: ((_firstVariant$images = firstVariant.images) === null || _firstVariant$images === void 0 ? void 0 : _firstVariant$images[0]) || ""
                };
              }));
          }
        }, _callee7);
      }));
      function searchProducts(_x10) {
        return _searchProducts.apply(this, arguments);
      }
      return searchProducts;
    }()
  }]);
}();
module.exports = new ProductService();