"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require("dotenv").config();
var User = require("../models/User");
var bcrypt = require("bcryptjs");
var saltRounds = 10;
var jwt = require("jsonwebtoken");
var _require = require("google-auth-library"),
  OAuth2Client = _require.OAuth2Client;
var axios = require("axios");
var clientId = process.env.VITE_GOOGLE_CLIENT_ID;
var client = new OAuth2Client(clientId);
function verifyToken(_x) {
  return _verifyToken.apply(this, arguments);
}
function _verifyToken() {
  _verifyToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(token) {
    var tiket, payload;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          _context10.n = 1;
          return client.verifyIdToken({
            idToken: token,
            audience: clientId
          });
        case 1:
          tiket = _context10.v;
          payload = tiket.getPayload();
          return _context10.a(2, payload);
      }
    }, _callee10);
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
var registerUserService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(name, email, password, confirmPassword) {
    var existingUser, hashedPassword, user;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          if (!(password !== confirmPassword)) {
            _context.n = 1;
            break;
          }
          throw new Error("Mật khẩu và xác nhận mật khẩu không khớp");
        case 1:
          _context.n = 2;
          return User.findOne({
            email: email
          });
        case 2:
          existingUser = _context.v;
          if (!existingUser) {
            _context.n = 3;
            break;
          }
          throw new Error("Email đã được sử dụng");
        case 3:
          _context.n = 4;
          return bcrypt.hash(password, saltRounds);
        case 4:
          hashedPassword = _context.v;
          // Tạo người dùng mới
          user = new User({
            name: name,
            email: email,
            password: hashedPassword
          });
          _context.n = 5;
          return user.save();
        case 5:
          return _context.a(2, user);
      }
    }, _callee);
  }));
  return function registerUserService(_x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var loginUserService = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(email, password) {
    var user, isMatch;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return User.findOne({
            email: email
          });
        case 1:
          user = _context2.v;
          if (user) {
            _context2.n = 2;
            break;
          }
          throw new Error("Email hoặc mật khẩu không chính xác.");
        case 2:
          _context2.n = 3;
          return bcrypt.compare(password, user.password);
        case 3:
          isMatch = _context2.v;
          if (isMatch) {
            _context2.n = 4;
            break;
          }
          throw new Error("Email hoặc mật khẩu không chính xác.");
        case 4:
          return _context2.a(2, user);
      }
    }, _callee2);
  }));
  return function loginUserService(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
var getUserInfoService = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(userId) {
    var user;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return User.findById(userId);
        case 1:
          user = _context3.v;
          if (user) {
            _context3.n = 2;
            break;
          }
          throw new Error("Người dùng không tìm thấy");
        case 2:
          return _context3.a(2, user);
      }
    }, _callee3);
  }));
  return function getUserInfoService(_x8) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllUsersService = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(search, isAdmin, page, limit) {
    var query, skip, users, totalUsers, totalPages;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          query = {}; // Xây dựng query tìm kiếm
          if (search) {
            query.$or = [{
              name: {
                $regex: search,
                $options: "i"
              }
            }, {
              email: {
                $regex: search,
                $options: "i"
              }
            }];
          }
          if (isAdmin === "true") {
            query.isAdmin = true;
          } else if (isAdmin === "false") {
            query.isAdmin = false;
          }
          skip = (page - 1) * limit; // Lấy danh sách người dùng
          _context4.n = 1;
          return User.find(query).skip(skip).limit(Number(limit)).select("-password") // Ẩn password
          .sort({
            createdAt: -1
          });
        case 1:
          users = _context4.v;
          _context4.n = 2;
          return User.countDocuments(query);
        case 2:
          totalUsers = _context4.v;
          totalPages = Math.ceil(totalUsers / limit);
          return _context4.a(2, {
            users: users,
            pagination: {
              totalUsers: totalUsers,
              totalPages: totalPages,
              currentPage: Number(page),
              limit: Number(limit)
            }
          });
      }
    }, _callee4);
  }));
  return function getAllUsersService(_x9, _x0, _x1, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var getUserDetailService = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId, currentUser) {
    var user;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          if (!(!currentUser.isAdmin && currentUser.id.toString() !== userId.toString())) {
            _context5.n = 1;
            break;
          }
          throw new Error("Bạn không có quyền xem thông tin người dùng này");
        case 1:
          _context5.n = 2;
          return User.findById(userId).select("-password");
        case 2:
          user = _context5.v;
          if (user) {
            _context5.n = 3;
            break;
          }
          throw new Error("Người dùng không tồn tại");
        case 3:
          return _context5.a(2, user);
      }
    }, _callee5);
  }));
  return function getUserDetailService(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();
var updateMyUserService = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(userId, updateData) {
    var updatedUser;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          if (userId) {
            _context6.n = 1;
            break;
          }
          throw new Error("ID người dùng không được để trống");
        case 1:
          _context6.n = 2;
          return User.findByIdAndUpdate(userId, updateData, {
            "new": true,
            runValidators: true
          }).select("-password");
        case 2:
          updatedUser = _context6.v;
          if (updatedUser) {
            _context6.n = 3;
            break;
          }
          throw new Error("Người dùng không tồn tại");
        case 3:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return function updateMyUserService(_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();
var updateUserService = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(userId, updateData, isAdmin) {
    var uppdatedUser;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          if (userId) {
            _context7.n = 1;
            break;
          }
          throw new Error("ID người dùng không được để trống");
        case 1:
          if (!(!isAdmin && "isAdmin" in updateData)) {
            _context7.n = 2;
            break;
          }
          throw new Error("Bạn không có quyền cập nhật thông tin người dùng này");
        case 2:
          if (!isAdmin) {
            delete updateData.isAdmin;
          }
          // Tìm người dùng theo ID và cập nhật thông tin
          _context7.n = 3;
          return User.findByIdAndUpdate(userId, updateData, {
            "new": true,
            runValidators: true
          }).select("-password");
        case 3:
          uppdatedUser = _context7.v;
          if (uppdatedUser) {
            _context7.n = 4;
            break;
          }
          throw new Error("Người dùng không tồn tại");
        case 4:
          return _context7.a(2, uppdatedUser);
      }
    }, _callee7);
  }));
  return function updateUserService(_x15, _x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();
var createUserService = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(userData) {
    var email, existing, newUser;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          email = userData.email;
          _context8.n = 1;
          return User.findOne({
            email: email
          });
        case 1:
          existing = _context8.v;
          if (!existing) {
            _context8.n = 2;
            break;
          }
          throw new Error("Email đã tồn tại");
        case 2:
          newUser = new User(userData);
          _context8.n = 3;
          return newUser.save();
        case 3:
          return _context8.a(2, newUser);
      }
    }, _callee8);
  }));
  return function createUserService(_x18) {
    return _ref8.apply(this, arguments);
  };
}();

// Lấy tất cả người dùng (không bao gồm password)
var getAllUsersRawSevice = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
    var users;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.n = 1;
          return User.find({}).select("-password").sort({
            createdAt: -1
          });
        case 1:
          users = _context9.v;
          return _context9.a(2, users);
      }
    }, _callee9);
  }));
  return function getAllUsersRawSevice() {
    return _ref9.apply(this, arguments);
  };
}();
console.log("clientId", clientId);
// Đăng nhập bằng Google
var loginWithGoogleService = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(token) {
    var response, _response$data, email, name, picture, sub, user, accessToken, _t;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          if (token) {
            _context0.n = 1;
            break;
          }
          throw new Error("Thiếu token từ Google");
        case 1:
          _context0.p = 1;
          _context0.n = 2;
          return axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
              Authorization: "Bearer ".concat(token)
            }
          });
        case 2:
          response = _context0.v;
          _response$data = response.data, email = _response$data.email, name = _response$data.name, picture = _response$data.picture, sub = _response$data.sub; // Tìm user theo email
          _context0.n = 3;
          return User.findOne({
            email: email
          });
        case 3:
          user = _context0.v;
          if (!user) {
            _context0.n = 5;
            break;
          }
          if (!(user.provider !== "google")) {
            _context0.n = 4;
            break;
          }
          throw new Error("Tài khoản đã tồn tại. Vui lòng đăng nhập bằng email và mật khẩu.");
        case 4:
          _context0.n = 7;
          break;
        case 5:
          _context0.n = 6;
          return User.create({
            name: name,
            email: email,
            avatar: picture,
            provider: "google",
            providerId: sub,
            password: null
          });
        case 6:
          user = _context0.v;
        case 7:
          // Tạo access token
          accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
            name: user.name,
            email: user.email
          }, process.env.JWT_SECRET, {
            expiresIn: "7d"
          });
          return _context0.a(2, {
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              isAdmin: user.isAdmin
            },
            accessToken: accessToken
          });
        case 8:
          _context0.p = 8;
          _t = _context0.v;
          console.error("Google OAuth error:", _t.message);
          throw new Error(_t.message || "Xác thực Google thất bại");
        case 9:
          return _context0.a(2);
      }
    }, _callee0, null, [[1, 8]]);
  }));
  return function loginWithGoogleService(_x19) {
    return _ref0.apply(this, arguments);
  };
}();

// Đăng nhập bằng Facebook
var loginWithFacebookService = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(accessToken) {
    var fbRes, _fbRes$data, email, name, id, picture, user, token;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          if (!(!accessToken || !userID)) {
            _context1.n = 1;
            break;
          }
          throw new Error("Thiếu thông tin từ Facebook");
        case 1:
          _context1.n = 2;
          return axios.get("https://graph.facebook.com/v12.0/".concat(userID), {
            params: {
              access_token: accessToken,
              fields: "id,name,email,picture"
            }
          });
        case 2:
          fbRes = _context1.v;
          _fbRes$data = fbRes.data, email = _fbRes$data.email, name = _fbRes$data.name, id = _fbRes$data.id, picture = _fbRes$data.picture;
          _context1.n = 3;
          return User.findOne({
            email: email
          });
        case 3:
          user = _context1.v;
          if (user) {
            _context1.n = 5;
            break;
          }
          _context1.n = 4;
          return User.create({
            name: name,
            email: email,
            avatar: picture.data.url,
            provider: "facebook",
            providerId: id,
            password: null
          });
        case 4:
          user = _context1.v;
        case 5:
          token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
          }, process.env.JWT_SECRET, {
            expiresIn: "7d"
          });
          return _context1.a(2, {
            user: user,
            accessToken: token
          });
      }
    }, _callee1);
  }));
  return function loginWithFacebookService(_x20) {
    return _ref1.apply(this, arguments);
  };
}();
module.exports = {
  registerUserService: registerUserService,
  loginUserService: loginUserService,
  getUserInfoService: getUserInfoService,
  getAllUsersService: getAllUsersService,
  getUserDetailService: getUserDetailService,
  updateUserService: updateUserService,
  createUserService: createUserService,
  getAllUsersRawSevice: getAllUsersRawSevice,
  loginWithGoogleService: loginWithGoogleService,
  loginWithFacebookService: loginWithFacebookService
};