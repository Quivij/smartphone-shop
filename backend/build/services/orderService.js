"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
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
var mongoose = require("mongoose"); // <-- THÊM DÒNG NÀY
var Order = require("../models/Order");
var Product = require("../models/Product");
var Coupon = require("../models/Coupon");
var OrderService = /*#__PURE__*/function () {
  function OrderService() {
    _classCallCheck(this, OrderService);
  }
  return _createClass(OrderService, [{
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(orderData, userId) {
        var orderItems, shippingAddress, paymentMethod, totalPrice, _orderData$discountAm, discountAmount, finalPrice, _orderData$couponCode, couponCode, coupon, newOrder;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              orderItems = orderData.orderItems, shippingAddress = orderData.shippingAddress, paymentMethod = orderData.paymentMethod, totalPrice = orderData.totalPrice, _orderData$discountAm = orderData.discountAmount, discountAmount = _orderData$discountAm === void 0 ? 0 : _orderData$discountAm, finalPrice = orderData.finalPrice, _orderData$couponCode = orderData.couponCode, couponCode = _orderData$couponCode === void 0 ? "" : _orderData$couponCode;
              if (!(!orderItems || orderItems.length === 0)) {
                _context.n = 1;
                break;
              }
              throw new Error("Không có sản phẩm nào trong đơn hàng");
            case 1:
              if (!couponCode) {
                _context.n = 5;
                break;
              }
              _context.n = 2;
              return Coupon.findOne({
                code: couponCode,
                isActive: true
              });
            case 2:
              coupon = _context.v;
              if (coupon) {
                _context.n = 3;
                break;
              }
              throw new Error("Mã giảm giá không hợp lệ");
            case 3:
              if (!(new Date(coupon.expireDate) < Date.now())) {
                _context.n = 4;
                break;
              }
              throw new Error("Mã giảm giá đã hết hạn");
            case 4:
              if (!(totalPrice < coupon.minOrderValue)) {
                _context.n = 5;
                break;
              }
              throw new Error("\u0110\u01A1n h\xE0ng ph\u1EA3i t\u1EEB ".concat(coupon.minOrderValue, "\u20AB \u0111\u1EC3 d\xF9ng m\xE3 n\xE0y"));
            case 5:
              newOrder = new Order({
                user: userId,
                orderItems: orderItems,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                totalPrice: totalPrice,
                discountAmount: discountAmount,
                finalPrice: finalPrice,
                couponCode: couponCode,
                isPaid: paymentMethod !== "COD",
                status: "Processing"
              });
              _context.n = 6;
              return newOrder.save();
            case 6:
              return _context.a(2, _context.v);
          }
        }, _callee);
      }));
      function createOrder(_x, _x2) {
        return _createOrder.apply(this, arguments);
      }
      return createOrder;
    }()
  }, {
    key: "getMyOrders",
    value: function () {
      var _getMyOrders = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(userId) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return Order.find({
                user: userId
              }).sort({
                createdAt: -1
              }).populate("orderItems.product", "name");
            case 1:
              return _context2.a(2, _context2.v);
          }
        }, _callee2);
      }));
      function getMyOrders(_x3) {
        return _getMyOrders.apply(this, arguments);
      }
      return getMyOrders;
    }()
  }, {
    key: "getAllOrders",
    value: function () {
      var _getAllOrders = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(filters, pagination) {
        var _pagination$page, page, _pagination$limit, limit, isDelivered, paymentStatus, filter, orders, total;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _pagination$page = pagination.page, page = _pagination$page === void 0 ? 1 : _pagination$page, _pagination$limit = pagination.limit, limit = _pagination$limit === void 0 ? 10 : _pagination$limit;
              isDelivered = filters.isDelivered, paymentStatus = filters.paymentStatus;
              filter = {};
              if (isDelivered !== undefined) filter.isDelivered = isDelivered === "true";
              if (paymentStatus) filter.paymentStatus = paymentStatus;
              _context3.n = 1;
              return Order.find(filter).populate("user", "name email").sort({
                createdAt: -1
              }).skip((page - 1) * limit).limit(Number(limit));
            case 1:
              orders = _context3.v;
              _context3.n = 2;
              return Order.countDocuments(filter);
            case 2:
              total = _context3.v;
              return _context3.a(2, {
                total: total,
                page: Number(page),
                orders: orders
              });
          }
        }, _callee3);
      }));
      function getAllOrders(_x4, _x5) {
        return _getAllOrders.apply(this, arguments);
      }
      return getAllOrders;
    }()
  }, {
    key: "getOrderById",
    value: function () {
      var _getOrderById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(orderId, userId, isAdmin) {
        var order, isOwner;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return Order.findById(orderId).populate("user", "name email").populate("orderItems.product");
            case 1:
              order = _context4.v;
              if (order) {
                _context4.n = 2;
                break;
              }
              throw new Error("Không tìm thấy đơn hàng");
            case 2:
              isOwner = order.user._id.toString() === userId;
              if (!(!isAdmin && !isOwner)) {
                _context4.n = 3;
                break;
              }
              throw new Error("Bạn không có quyền truy cập đơn hàng này");
            case 3:
              return _context4.a(2, order);
          }
        }, _callee4);
      }));
      function getOrderById(_x6, _x7, _x8) {
        return _getOrderById.apply(this, arguments);
      }
      return getOrderById;
    }()
  }, {
    key: "markAsDelivered",
    value: function () {
      var _markAsDelivered = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(orderId) {
        var order, productUpdatePromises, _iterator, _step, item, updatePromise, _t;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return Order.findById(orderId);
            case 1:
              order = _context5.v;
              if (order) {
                _context5.n = 2;
                break;
              }
              throw new Error("Không tìm thấy đơn hàng");
            case 2:
              if (!order.isDelivered) {
                _context5.n = 3;
                break;
              }
              throw new Error("Đơn hàng đã được giao trước đó");
            case 3:
              productUpdatePromises = [];
              _iterator = _createForOfIteratorHelper(order.orderItems);
              _context5.p = 4;
              _iterator.s();
            case 5:
              if ((_step = _iterator.n()).done) {
                _context5.n = 8;
                break;
              }
              item = _step.value;
              if (mongoose.Types.ObjectId.isValid(item.product)) {
                _context5.n = 6;
                break;
              }
              console.warn("ID s\u1EA3n ph\u1EA9m kh\xF4ng h\u1EE3p l\u1EC7 trong \u0111\u01A1n h\xE0ng ".concat(orderId, ": ").concat(item.product));
              return _context5.a(3, 7);
            case 6:
              updatePromise = Product.updateOne({
                _id: item.product,
                "variants.color": item.color,
                "variants.storage": item.storage
              }, {
                $inc: {
                  "variants.$.stock": -item.quantity,
                  "variants.$.sold": item.quantity,
                  sold: item.quantity
                }
              });
              productUpdatePromises.push(updatePromise);
            case 7:
              _context5.n = 5;
              break;
            case 8:
              _context5.n = 10;
              break;
            case 9:
              _context5.p = 9;
              _t = _context5.v;
              _iterator.e(_t);
            case 10:
              _context5.p = 10;
              _iterator.f();
              return _context5.f(10);
            case 11:
              _context5.n = 12;
              return Promise.all(productUpdatePromises);
            case 12:
              order.isDelivered = true;
              order.deliveredAt = new Date();
              order.status = "Delivered";
              _context5.n = 13;
              return order.save();
            case 13:
              return _context5.a(2, _context5.v);
          }
        }, _callee5, null, [[4, 9, 10, 11]]);
      }));
      function markAsDelivered(_x9) {
        return _markAsDelivered.apply(this, arguments);
      }
      return markAsDelivered;
    }()
  }, {
    key: "markAsPaid",
    value: function () {
      var _markAsPaid = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(orderId) {
        var order;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return Order.findById(orderId);
            case 1:
              order = _context6.v;
              if (order) {
                _context6.n = 2;
                break;
              }
              throw new Error("Không tìm thấy đơn hàng");
            case 2:
              if (!(order.paymentStatus === "paid")) {
                _context6.n = 3;
                break;
              }
              throw new Error("Đơn hàng đã được thanh toán");
            case 3:
              order.paymentStatus = "paid";
              order.paidAt = new Date();
              _context6.n = 4;
              return order.save();
            case 4:
              return _context6.a(2, _context6.v);
          }
        }, _callee6);
      }));
      function markAsPaid(_x0) {
        return _markAsPaid.apply(this, arguments);
      }
      return markAsPaid;
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(orderId) {
        var order;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return Order.findById(orderId);
            case 1:
              order = _context7.v;
              if (order) {
                _context7.n = 2;
                break;
              }
              throw new Error("Đơn hàng không tồn tại");
            case 2:
              if (!(order.status === "Delivered")) {
                _context7.n = 3;
                break;
              }
              throw new Error("Không thể hủy đơn hàng đã giao");
            case 3:
              if (!(order.status === "Cancelled")) {
                _context7.n = 4;
                break;
              }
              throw new Error("Đơn hàng đã bị hủy trước đó");
            case 4:
              order.status = "Cancelled";
              _context7.n = 5;
              return order.save();
            case 5:
              return _context7.a(2, _context7.v);
          }
        }, _callee7);
      }));
      function cancelOrder(_x1) {
        return _cancelOrder.apply(this, arguments);
      }
      return cancelOrder;
    }()
  }]);
}();
module.exports = new OrderService();