"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var User = require("../models/User"); // Đảm bảo đường dẫn đúng
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fs = require("fs");
var axios = require("axios");
var _require = require("../services/userService"),
  registerUserService = _require.registerUserService,
  loginUserService = _require.loginUserService,
  getUserInfoService = _require.getUserInfoService,
  getAllUsersService = _require.getAllUsersService,
  getUserDetailService = _require.getUserDetailService,
  getAllUsersRawSevice = _require.getAllUsersRawSevice,
  updateUserService = _require.updateUserService,
  createUserService = _require.createUserService,
  loginWithGoogleService = _require.loginWithGoogleService,
  loginWithFacebookService = _require.loginWithFacebookService;
function verifyToken(_x) {
  return _verifyToken.apply(this, arguments);
}
function _verifyToken() {
  _verifyToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(token) {
    var ticket, payload;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          _context13.n = 1;
          return client.verifyIdToken({
            idToken: token,
            audience: clientId
          });
        case 1:
          ticket = _context13.v;
          payload = ticket.getPayload();
          return _context13.a(2, payload);
      }
    }, _callee13);
  }));
  return _verifyToken.apply(this, arguments);
}
var generateAccessToken = function generateAccessToken(user) {
  return jwt.sign({
    id: user._id,
    isAdmin: user.isAdmin,
    name: user.name,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
};

// Tạo Refresh Token (hết hạn sau 30 ngày)
var generateRefreshToken = function generateRefreshToken(user) {
  return jwt.sign({
    id: user._id,
    isAdmin: user.isAdmin,
    name: user.name,
    email: user.email
  }, process.env.REFRESH_SECRET, {
    expiresIn: "30d"
  });
};
var registerUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, name, email, password, confirmPassword, data, accessToken, _refreshToken, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, confirmPassword = _req$body.confirmPassword;
          _context.n = 1;
          return registerUserService(name, email, password, confirmPassword);
        case 1:
          data = _context.v;
          accessToken = generateAccessToken(data);
          _refreshToken = generateRefreshToken(data);
          res.cookie("refreshToken", _refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
          });
          res.status(201).json({
            message: "Đăng ký thành công",
            user: {
              id: data._id,
              name: data.name,
              email: data.email,
              isAdmin: data.isAdmin
            },
            accessToken: accessToken
          });
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          console.error("Lỗi đăng ký:", _t);
          res.status(500).json({
            message: "Lỗi server"
          });
        case 3:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function registerUser(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

///////ĐĂNG NHÂP
var loginUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body2, email, password, user, accessToken, _refreshToken2, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.p = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Gọi service để xử lý logic đăng nhập
          _context2.n = 1;
          return loginUserService(email, password);
        case 1:
          user = _context2.v;
          // Tạo JWT token
          accessToken = generateAccessToken(user);
          _refreshToken2 = generateRefreshToken(user); // Lưu Refresh Token vào cookie
          res.cookie("refreshToken", _refreshToken2, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/" // Thêm path để đảm bảo cookie được gửi đúng
          });

          // Trả về thông tin người dùng cùng với avatar
          res.status(200).json({
            message: "Đăng nhập thành công",
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              // Giờ đây frontend sẽ tự xử lý URL
              isAdmin: user.isAdmin
            },
            accessToken: accessToken
          });
          _context2.n = 4;
          break;
        case 2:
          _context2.p = 2;
          _t2 = _context2.v;
          if (!(_t2.message === "Email hoặc mật khẩu không chính xác.")) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(401).json({
            message: _t2.message
          }));
        case 3:
          // Đối với các lỗi không mong muốn khác, trả về lỗi 500
          console.error("Lỗi đăng nhập không xác định:", _t2);
          res.status(500).json({
            message: "Đã có lỗi xảy ra, vui lòng thử lại."
          });
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function loginUser(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
////////////////////////LẤY THÔNG TIN NGƯỜI DÙNG
var getUserInfo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var userId, user, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.p = 0;
          userId = req.user.id; // Lấy ID người dùng từ token
          // Gọi service để lấy thông tin người dùng
          _context3.n = 1;
          return getUserInfoService(userId);
        case 1:
          user = _context3.v;
          // Trả về thông tin người dùng bao gồm avatar
          res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar || "/default-avatar.png",
            // trả về avatar nếu có
            isAdmin: user.isAdmin
          });
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t3 = _context3.v;
          console.error(_t3);
          res.status(_t3.message === "Người dùng không tìm thấy" ? 404 : 500).json({
            message: _t3.message
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function getUserInfo(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllUsers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$query, _req$query$search, search, _req$query$isAdmin, isAdmin, _req$query$page, page, _req$query$limit, limit, result, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.p = 0;
          _req$query = req.query, _req$query$search = _req$query.search, search = _req$query$search === void 0 ? "" : _req$query$search, _req$query$isAdmin = _req$query.isAdmin, isAdmin = _req$query$isAdmin === void 0 ? "all" : _req$query$isAdmin, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit; // Gọi service để lấy danh sách người dùng
          _context4.n = 1;
          return getAllUsersService(search, isAdmin, page, limit);
        case 1:
          result = _context4.v;
          // Trả về phản hồi
          res.status(200).json({
            users: result.users,
            pagination: result.pagination
          });
          _context4.n = 3;
          break;
        case 2:
          _context4.p = 2;
          _t4 = _context4.v;
          console.error(_t4); // Log lỗi để debug
          res.status(500).json({
            message: "Lỗi khi lấy danh sách người dùng"
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function getAllUsers(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
var getUserDetail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var userId, currentUser, user, statusCode, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.p = 0;
          userId = req.params.userId;
          currentUser = req.user; // Lấy thông tin người dùng hiện tại từ token
          // Gọi service để lấy thông tin chi tiết người dùng
          _context5.n = 1;
          return getUserDetailService(userId, currentUser);
        case 1:
          user = _context5.v;
          // Trả về thông tin người dùng
          res.status(200).json(user);
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t5 = _context5.v;
          console.error(_t5);
          statusCode = _t5.message === "Người dùng không tồn tại" ? 404 : _t5.message === "Bạn không có quyền xem thông tin người dùng này" ? 403 : 500;
          res.status(statusCode).json({
            message: _t5.message
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function getUserDetail(_x0, _x1) {
    return _ref5.apply(this, arguments);
  };
}();

////////////////////XÓA THÔNG TIN NGƯỜI DÙNG
var deleteUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var id, deleted, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.p = 0;
          id = req.params.id;
          _context6.n = 1;
          return User.findByIdAndDelete(id);
        case 1:
          deleted = _context6.v;
          if (deleted) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, res.status(404).json({
            message: "Người dùng không tồn tại"
          }));
        case 2:
          res.status(200).json({
            message: "Xoá người dùng thành công"
          });
          _context6.n = 4;
          break;
        case 3:
          _context6.p = 3;
          _t6 = _context6.v;
          res.status(500).json({
            message: "Lỗi khi xoá người dùng"
          });
        case 4:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 3]]);
  }));
  return function deleteUser(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

////////TOKEN HET HAN
var refreshToken = function refreshToken(req, res) {
  try {
    var _refreshToken3 = req.cookies.refreshToken;
    if (!_refreshToken3) return res.status(401).json({
      message: "Chưa đăng nhập"
    });
    jwt.verify(_refreshToken3, process.env.REFRESH_SECRET, function (err, user) {
      if (err) return res.status(403).json({
        message: "Token không hợp lệ"
      });
      var newAccessToken = generateAccessToken({
        id: user.id,
        isAdmin: user.isAdmin
      });
      res.status(200).json({
        accessToken: newAccessToken
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi server"
    });
  }
};
// Đăng xuất (Xóa Refresh Token)
var logoutUser = function logoutUser(req, res) {
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Đăng xuất thành công"
  });
};

// Update user profile

var getMyProfile = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var user, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return User.findById(req.user.id).select("-password");
        case 1:
          user = _context7.v;
          if (user) {
            _context7.n = 2;
            break;
          }
          return _context7.a(2, res.status(404).json({
            message: "Người dùng không tồn tại"
          }));
        case 2:
          res.status(200).json(user);
          _context7.n = 4;
          break;
        case 3:
          _context7.p = 3;
          _t7 = _context7.v;
          console.error(_t7);
          res.status(500).json({
            message: "Lỗi server"
          });
        case 4:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 3]]);
  }));
  return function getMyProfile(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var updateMyUssr = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var userId, _req$body3, name, email, phone, address, updateData, avatarPath, updatedUser, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.p = 0;
          userId = req.user.id; // Lấy ID người dùng từ token
          _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, phone = _req$body3.phone, address = _req$body3.address;
          updateData = {
            name: name,
            email: email,
            phone: phone,
            address: address
          }; // Nếu có file avatar (upload mới)
          if (req.file) {
            avatarPath = "/uploads/avatars/".concat(req.file.filename);
            updateData.avatar = avatarPath;
          }
          _context8.n = 1;
          return updateUserService(userId, updateData);
        case 1:
          updatedUser = _context8.v;
          res.status(200).json({
            message: "Cập nhật thông tin thành công!",
            user: updatedUser
          });
          _context8.n = 3;
          break;
        case 2:
          _context8.p = 2;
          _t8 = _context8.v;
          console.error("Lỗi cập nhật thông tin người dùng:", _t8);
          res.status(500).json({
            message: "Có lỗi xảy ra khi cập nhật thông tin người dùng."
          });
        case 3:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 2]]);
  }));
  return function updateMyUssr(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var updateUser = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var isAdmin, userId, _req$body4, name, email, phone, address, updatedIsAdmin, updateData, avatarPath, updatedUser, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.p = 0;
          isAdmin = req.user.isAdmin;
          userId = req.params.id || req.user.id; // ✅ Sửa tại đây
          _req$body4 = req.body, name = _req$body4.name, email = _req$body4.email, phone = _req$body4.phone, address = _req$body4.address, updatedIsAdmin = _req$body4.isAdmin;
          updateData = {
            name: name,
            email: email,
            phone: phone,
            address: address
          }; // Chỉ admin mới được cập nhật quyền isAdmin
          if (isAdmin && typeof updatedIsAdmin === "boolean") {
            updateData.isAdmin = updatedIsAdmin;
          }

          // Nếu có file avatar (upload mới)
          if (req.file) {
            avatarPath = "/uploads/avatars/".concat(req.file.filename);
            updateData.avatar = avatarPath;
          }
          _context9.n = 1;
          return updateUserService(userId, updateData, isAdmin);
        case 1:
          updatedUser = _context9.v;
          res.status(200).json({
            message: "Cập nhật người dùng thành công!",
            user: updatedUser
          });
          _context9.n = 3;
          break;
        case 2:
          _context9.p = 2;
          _t9 = _context9.v;
          console.error("Lỗi cập nhật user:", _t9);
          res.status(500).json({
            message: "Có lỗi xảy ra khi cập nhật người dùng."
          });
        case 3:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 2]]);
  }));
  return function updateUser(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();
var createUser = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var _req$body5, name, email, password, phone, address, isAdmin, newUser, _t0;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          _context0.p = 0;
          _req$body5 = req.body, name = _req$body5.name, email = _req$body5.email, password = _req$body5.password, phone = _req$body5.phone, address = _req$body5.address, isAdmin = _req$body5.isAdmin;
          _context0.n = 1;
          return UserService.createUserService({
            name: name,
            email: email,
            password: password,
            phone: phone,
            address: address,
            isAdmin: isAdmin
          });
        case 1:
          newUser = _context0.v;
          res.status(201).json({
            message: "Tạo người dùng thành công",
            user: newUser
          });
          _context0.n = 4;
          break;
        case 2:
          _context0.p = 2;
          _t0 = _context0.v;
          if (!(_t0.message === "Email đã tồn tại")) {
            _context0.n = 3;
            break;
          }
          return _context0.a(2, res.status(400).json({
            message: _t0.message
          }));
        case 3:
          res.status(500).json({
            message: "Lỗi khi tạo người dùng"
          });
        case 4:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 2]]);
  }));
  return function createUser(_x18, _x19) {
    return _ref0.apply(this, arguments);
  };
}();

// Lấy tất cả người dùng
var getAllUsersRaw = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var users, _t1;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          _context1.p = 0;
          _context1.n = 1;
          return UserService.getAllUsersService();
        case 1:
          users = _context1.v;
          res.status(200).json(users);
          _context1.n = 3;
          break;
        case 2:
          _context1.p = 2;
          _t1 = _context1.v;
          console.error("Lỗi khi xuất tất cả người dùng:", _t1);
          res.status(500).json({
            message: "Lỗi khi lấy tất cả người dùng"
          });
        case 3:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 2]]);
  }));
  return function getAllUsersRaw(_x20, _x21) {
    return _ref1.apply(this, arguments);
  };
}();

// Đăng nhập bằng Google
var loginWithGoogle = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var token, result, _t10;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          _context10.p = 0;
          token = req.body.token;
          if (token) {
            _context10.n = 1;
            break;
          }
          return _context10.a(2, res.status(400).json({
            message: "Token không hợp lệ"
          }));
        case 1:
          _context10.n = 2;
          return loginWithGoogleService(token);
        case 2:
          result = _context10.v;
          return _context10.a(2, res.status(200).json(result));
        case 3:
          _context10.p = 3;
          _t10 = _context10.v;
          console.error("Lỗi Google Login:", _t10);

          // Trả mã lỗi 400 nếu là lỗi logic (ví dụ tài khoản đã tồn tại)
          if (!(_t10.message === "Tài khoản đã tồn tại. Vui lòng đăng nhập bằng email và mật khẩu.")) {
            _context10.n = 4;
            break;
          }
          return _context10.a(2, res.status(400).json({
            message: _t10.message,
            email: _t10.email || null // truyền email về nếu có
          }));
        case 4:
          return _context10.a(2, res.status(401).json({
            message: "Đăng nhập Google thất bại"
          }));
      }
    }, _callee10, null, [[0, 3]]);
  }));
  return function loginWithGoogle(_x22, _x23) {
    return _ref10.apply(this, arguments);
  };
}();

// Đăng nhập bằng Facebook
var loginWithFacebook = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var _req$body6, accessToken, userID, _yield$UserService$lo, user, token, _t11;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          _context11.p = 0;
          _req$body6 = req.body, accessToken = _req$body6.accessToken, userID = _req$body6.userID;
          _context11.n = 1;
          return UserService.loginWithFacebookService(accessToken, userID);
        case 1:
          _yield$UserService$lo = _context11.v;
          user = _yield$UserService$lo.user;
          token = _yield$UserService$lo.accessToken;
          res.json({
            message: "Đăng nhập Facebook thành công",
            user: user,
            accessToken: token
          });
          _context11.n = 4;
          break;
        case 2:
          _context11.p = 2;
          _t11 = _context11.v;
          console.error("Lỗi Facebook Login:", _t11);
          if (!(_t11.message === "Thiếu thông tin từ Facebook")) {
            _context11.n = 3;
            break;
          }
          return _context11.a(2, res.status(400).json({
            message: _t11.message
          }));
        case 3:
          res.status(401).json({
            message: "Xác thực Facebook thất bại"
          });
        case 4:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 2]]);
  }));
  return function loginWithFacebook(_x24, _x25) {
    return _ref11.apply(this, arguments);
  };
}();
// Thêm controller này vào file của bạn

var changePassword = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var userId, _req$body7, currentPassword, newPassword, confirmPassword, user, isMatch, salt, _t12;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.n) {
        case 0:
          _context12.p = 0;
          // 1. Lấy thông tin từ request
          userId = req.user.id;
          _req$body7 = req.body, currentPassword = _req$body7.currentPassword, newPassword = _req$body7.newPassword, confirmPassword = _req$body7.confirmPassword; // 2. Kiểm tra dữ liệu đầu vào
          if (!(!currentPassword || !newPassword || !confirmPassword)) {
            _context12.n = 1;
            break;
          }
          return _context12.a(2, res.status(400).json({
            message: "Vui lòng nhập đầy đủ thông tin."
          }));
        case 1:
          if (!(newPassword !== confirmPassword)) {
            _context12.n = 2;
            break;
          }
          return _context12.a(2, res.status(400).json({
            message: "Mật khẩu mới không khớp."
          }));
        case 2:
          _context12.n = 3;
          return User.findById(userId);
        case 3:
          user = _context12.v;
          if (user) {
            _context12.n = 4;
            break;
          }
          return _context12.a(2, res.status(404).json({
            message: "Người dùng không tồn tại."
          }));
        case 4:
          _context12.n = 5;
          return bcrypt.compare(currentPassword, user.password);
        case 5:
          isMatch = _context12.v;
          if (isMatch) {
            _context12.n = 6;
            break;
          }
          return _context12.a(2, res.status(400).json({
            message: "Mật khẩu hiện tại không chính xác."
          }));
        case 6:
          _context12.n = 7;
          return bcrypt.genSalt(10);
        case 7:
          salt = _context12.v;
          _context12.n = 8;
          return bcrypt.hash(newPassword, salt);
        case 8:
          user.password = _context12.v;
          _context12.n = 9;
          return user.save();
        case 9:
          res.status(200).json({
            message: "Đổi mật khẩu thành công!"
          });
          _context12.n = 11;
          break;
        case 10:
          _context12.p = 10;
          _t12 = _context12.v;
          console.error("Lỗi đổi mật khẩu:", _t12);
          res.status(500).json({
            message: "Lỗi server khi đổi mật khẩu."
          });
        case 11:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 10]]);
  }));
  return function changePassword(_x26, _x27) {
    return _ref12.apply(this, arguments);
  };
}();
module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  updateUser: updateUser,
  getUserInfo: getUserInfo,
  getAllUsers: getAllUsers,
  getUserDetail: getUserDetail,
  deleteUser: deleteUser,
  refreshToken: refreshToken,
  logoutUser: logoutUser,
  createUser: createUser,
  getMyProfile: getMyProfile,
  getAllUsersRaw: getAllUsersRaw,
  loginWithGoogle: loginWithGoogle,
  loginWithFacebook: loginWithFacebook,
  changePassword: changePassword
};