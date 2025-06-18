"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var Cart = require("../models/Cart");
var getCart = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userId) {
    var cart;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return Cart.findOne({
            userId: userId
          });
        case 1:
          cart = _context.v;
          return _context.a(2, cart || {
            userId: userId,
            items: []
          });
      }
    }, _callee);
  }));
  return function getCart(_x) {
    return _ref.apply(this, arguments);
  };
}();
var addToCart = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(userId, productData) {
    var productId, name, price, image, color, storage, quantity, cart, existingItem;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          productId = productData.productId, name = productData.name, price = productData.price, image = productData.image, color = productData.color, storage = productData.storage, quantity = productData.quantity;
          if (!(!productId || !name || !price || !color || !storage)) {
            _context2.n = 1;
            break;
          }
          throw new Error("Thiếu thông tin sản phẩm");
        case 1:
          _context2.n = 2;
          return Cart.findOne({
            userId: userId
          });
        case 2:
          cart = _context2.v;
          if (!cart) {
            cart = new Cart({
              userId: userId,
              items: []
            });
          }

          // const productIdObj = new mongoose.Types.ObjectId(productId); // 🔥 ÉP KIỂU TẠI ĐÂY
          existingItem = cart.items.find(function (item) {
            return item.productId.toString() === productId && item.color === color && item.storage === storage;
          });
          if (existingItem) {
            existingItem.quantity += quantity || 1;
          } else {
            cart.items.push({
              productId: productId,
              name: name,
              price: price,
              image: image,
              color: color,
              storage: storage,
              quantity: quantity || 1
            });
          }
          _context2.n = 3;
          return cart.save();
        case 3:
          return _context2.a(2, cart);
      }
    }, _callee2);
  }));
  return function addToCart(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var updateCartItem = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(userId, _ref3) {
    var productId, color, storage, quantity, cart, item;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          productId = _ref3.productId, color = _ref3.color, storage = _ref3.storage, quantity = _ref3.quantity;
          _context3.n = 1;
          return Cart.findOne({
            userId: userId
          });
        case 1:
          cart = _context3.v;
          if (cart) {
            _context3.n = 2;
            break;
          }
          throw new Error("Không tìm thấy giỏ hàng");
        case 2:
          item = cart.items.find(function (item) {
            return item.productId.toString() === productId && item.color === color && item.storage === storage;
          });
          if (item) {
            _context3.n = 3;
            break;
          }
          throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
        case 3:
          item.quantity = Math.max(1, quantity);
          _context3.n = 4;
          return cart.save();
        case 4:
          return _context3.a(2, cart);
      }
    }, _callee3);
  }));
  return function updateCartItem(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var removeFromCart = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(userId, _ref5) {
    var productId, color, storage, cart;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          productId = _ref5.productId, color = _ref5.color, storage = _ref5.storage;
          _context4.n = 1;
          return Cart.findOne({
            userId: userId
          });
        case 1:
          cart = _context4.v;
          if (cart) {
            _context4.n = 2;
            break;
          }
          throw new Error("Không tìm thấy giỏ hàng");
        case 2:
          cart.items = cart.items.filter(function (item) {
            return item.productId.toString() !== productId || item.color !== color || item.storage !== storage;
          });
          _context4.n = 3;
          return cart.save();
        case 3:
          return _context4.a(2, cart);
      }
    }, _callee4);
  }));
  return function removeFromCart(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();
var clearCart = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId) {
    var cart;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return Cart.findOne({
            userId: userId
          });
        case 1:
          cart = _context5.v;
          if (!cart) {
            _context5.n = 2;
            break;
          }
          cart.items = [];
          _context5.n = 2;
          return cart.save();
        case 2:
          return _context5.a(2, {
            message: "Đã xóa toàn bộ giỏ hàng"
          });
      }
    }, _callee5);
  }));
  return function clearCart(_x8) {
    return _ref7.apply(this, arguments);
  };
}();
var removeMultipleItemsFromCart = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(userId, items) {
    var cart;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          if (!(!Array.isArray(items) || items.length === 0)) {
            _context6.n = 1;
            break;
          }
          throw new Error("Danh sách sản phẩm không hợp lệ");
        case 1:
          _context6.n = 2;
          return Cart.findOne({
            userId: userId
          });
        case 2:
          cart = _context6.v;
          if (cart) {
            _context6.n = 3;
            break;
          }
          throw new Error("Không tìm thấy giỏ hàng");
        case 3:
          cart.items = cart.items.filter(function (item) {
            return !items.some(function (rm) {
              return rm.productId === item.productId.toString() && rm.color === item.color && rm.storage === item.storage;
            });
          });
          _context6.n = 4;
          return cart.save();
        case 4:
          return _context6.a(2, {
            message: "Đã xóa các sản phẩm được chọn",
            cartItems: cart.items
          });
      }
    }, _callee6);
  }));
  return function removeMultipleItemsFromCart(_x9, _x0) {
    return _ref8.apply(this, arguments);
  };
}();
module.exports = {
  getCart: getCart,
  addToCart: addToCart,
  updateCartItem: updateCartItem,
  removeFromCart: removeFromCart,
  clearCart: clearCart,
  removeMultipleItemsFromCart: removeMultipleItemsFromCart
};