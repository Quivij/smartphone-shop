"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDashboardStats = void 0;
var _Order = _interopRequireDefault(require("../models/Order.js"));
var _Product = _interopRequireDefault(require("../models/Product.js"));
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// --- Helper Functions ---

/**
 * Lấy số tuần ISO trong năm.
 * @param {Date} date - Ngày cần kiểm tra.
 * @returns {number} - Số tuần.
 */
function getWeekNumber(date) {
  var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

/**
 * Định dạng dữ liệu biểu đồ, lấp đầy các khoảng trống không có dữ liệu bằng giá trị 0.
 * @param {Array} statsData - Dữ liệu thô từ MongoDB aggregate.
 * @param {number} intervals - Số lượng khoảng thời gian (7 ngày, 6 tuần, 6 tháng).
 * @param {'day' | 'week' | 'month'} view - Chế độ xem.
 * @param {string} dataKey - Tên key của dữ liệu (ví dụ: 'doanhThu' hoặc 'soLuong').
 * @returns {Array} - Mảng dữ liệu đã được định dạng cho biểu đồ.
 */
function formatChartData(statsData, intervals, view, dataKeys) {
  var chartData = [];
  var now = new Date();
  var _loop = function _loop() {
    var date = new Date();
    var name = "";
    var matchCondition = function matchCondition(item) {
      return false;
    };
    if (view === "day") {
      date.setDate(now.getDate() - i);
      name = "".concat(date.getDate(), "/").concat(date.getMonth() + 1);
      matchCondition = function matchCondition(item) {
        return item._id.day === date.getDate() && item._id.month === date.getMonth() + 1 && item._id.year === date.getFullYear();
      };
    } else if (view === "week") {
      date.setDate(now.getDate() - i * 7);
      var week = getWeekNumber(date);
      var year = date.getFullYear();
      name = "Tu\u1EA7n ".concat(week);
      matchCondition = function matchCondition(item) {
        return item._id.week === week && item._id.year === year;
      };
    } else {
      // month
      date.setMonth(now.getMonth() - i);
      name = "Th\xE1ng ".concat(date.getMonth() + 1);
      matchCondition = function matchCondition(item) {
        return item._id.month === date.getMonth() + 1 && item._id.year === date.getFullYear();
      };
    }
    var found = statsData.find(matchCondition);
    var dataPoint = {
      name: name
    };
    dataKeys.forEach(function (key) {
      dataPoint[key.keyInChart] = found ? found[key.keyInDb] : 0;
    });
    chartData.push(dataPoint);
  };
  for (var i = intervals - 1; i >= 0; i--) {
    _loop();
  }
  return chartData;
}

// --- Main Controller ---

var getDashboardStats = exports.getDashboardStats = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _revenueAgg$, _discountAgg$, now, _yield$Promise$all, _yield$Promise$all2, totalUsers, totalOrders, totalProducts, revenueAgg, discountAgg, totalRevenue, totalDiscount, last7Days, last6Weeks, last6Months, dayGroupId, weekGroupId, monthGroupId, createRevenuePipeline, createProductPipeline, _yield$Promise$all3, _yield$Promise$all4, revenueByDay, revenueByWeek, revenueByMonth, productsByDay, productsByWeek, productsByMonth, revenueKeys, productKeys, formattedRevenueByDay, formattedRevenueByWeek, formattedRevenueByMonth, formattedProductsByDay, formattedProductsByWeek, formattedProductsByMonth, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          now = new Date(); // 1. TÍNH TOÁN CÁC SỐ LIỆU TỔNG QUAN
          _context.n = 1;
          return Promise.all([_User["default"].countDocuments(), _Order["default"].countDocuments(), _Product["default"].countDocuments(), _Order["default"].aggregate([{
            $match: {
              status: {
                $ne: "cancelled"
              }
            }
          }, {
            $group: {
              _id: null,
              total: {
                $sum: "$totalPrice"
              }
            }
          }]), _Order["default"].aggregate([{
            $match: {
              status: {
                $ne: "cancelled"
              }
            }
          }, {
            $group: {
              _id: null,
              totalDiscount: {
                $sum: "$discountAmount"
              }
            }
          }])]);
        case 1:
          _yield$Promise$all = _context.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 5);
          totalUsers = _yield$Promise$all2[0];
          totalOrders = _yield$Promise$all2[1];
          totalProducts = _yield$Promise$all2[2];
          revenueAgg = _yield$Promise$all2[3];
          discountAgg = _yield$Promise$all2[4];
          totalRevenue = ((_revenueAgg$ = revenueAgg[0]) === null || _revenueAgg$ === void 0 ? void 0 : _revenueAgg$.total) || 0;
          totalDiscount = ((_discountAgg$ = discountAgg[0]) === null || _discountAgg$ === void 0 ? void 0 : _discountAgg$.totalDiscount) || 0; // 2. CHUẨN BỊ CHO VIỆC LẤY DỮ LIỆU BIỂU ĐỒ
          // Xác định khoảng thời gian
          last7Days = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
          last6Weeks = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 41);
          last6Months = new Date(now.getFullYear(), now.getMonth() - 5, 1); // Xác định cách nhóm dữ liệu (grouping)
          dayGroupId = {
            day: {
              $dayOfMonth: "$createdAt"
            },
            month: {
              $month: "$createdAt"
            },
            year: {
              $year: "$createdAt"
            }
          };
          weekGroupId = {
            week: {
              $isoWeek: "$createdAt"
            },
            year: {
              $isoWeekYear: "$createdAt"
            }
          };
          monthGroupId = {
            month: {
              $month: "$createdAt"
            },
            year: {
              $year: "$createdAt"
            }
          }; // 3. TẠO CÁC PIPELINE AGGREGATE
          createRevenuePipeline = function createRevenuePipeline(startDate, groupId) {
            return [{
              $match: {
                createdAt: {
                  $gte: startDate
                },
                status: {
                  $ne: "cancelled"
                }
              }
            }, {
              $group: {
                _id: groupId,
                totalRevenue: {
                  $sum: "$totalPrice"
                },
                totalDiscount: {
                  $sum: "$discountAmount"
                }
              }
            }, {
              $sort: {
                "_id.year": 1,
                "_id.month": 1,
                "_id.week": 1,
                "_id.day": 1
              }
            }];
          };
          createProductPipeline = function createProductPipeline(startDate, groupId) {
            return [
            // Lưu ý: Đổi "cancelled" thành "Cancelled" để khớp với Enum của bạn
            {
              $match: {
                createdAt: {
                  $gte: startDate
                },
                status: {
                  $ne: "Cancelled"
                }
              }
            },
            // === DÒNG ĐÃ SỬA ===
            // Đổi từ "$items" thành "$orderItems"
            {
              $unwind: "$orderItems"
            }, {
              $group: {
                _id: groupId,
                // === DÒNG ĐÃ SỬA ===
                // Đổi từ "$items.quantity" thành "$orderItems.quantity"
                totalQuantity: {
                  $sum: "$orderItems.quantity"
                }
              }
            }, {
              $sort: {
                "_id.year": 1,
                "_id.month": 1,
                "_id.week": 1,
                "_id.day": 1
              }
            }];
          }; // 4. THỰC THI TẤT CẢ PIPELINE SONG SONG
          _context.n = 2;
          return Promise.all([_Order["default"].aggregate(createRevenuePipeline(last7Days, dayGroupId)), _Order["default"].aggregate(createRevenuePipeline(last6Weeks, weekGroupId)), _Order["default"].aggregate(createRevenuePipeline(last6Months, monthGroupId)), _Order["default"].aggregate(createProductPipeline(last7Days, dayGroupId)), _Order["default"].aggregate(createProductPipeline(last6Weeks, weekGroupId)), _Order["default"].aggregate(createProductPipeline(last6Months, monthGroupId))]);
        case 2:
          _yield$Promise$all3 = _context.v;
          _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 6);
          revenueByDay = _yield$Promise$all4[0];
          revenueByWeek = _yield$Promise$all4[1];
          revenueByMonth = _yield$Promise$all4[2];
          productsByDay = _yield$Promise$all4[3];
          productsByWeek = _yield$Promise$all4[4];
          productsByMonth = _yield$Promise$all4[5];
          // 5. ĐỊNH DẠNG DỮ LIỆU TRẢ VỀ CHO BIỂU ĐỒ
          revenueKeys = [{
            keyInDb: "totalRevenue",
            keyInChart: "doanhThu"
          }, {
            keyInDb: "totalDiscount",
            keyInChart: "discount"
          }];
          productKeys = [{
            keyInDb: "totalQuantity",
            keyInChart: "soLuong"
          }];
          formattedRevenueByDay = formatChartData(revenueByDay, 7, "day", revenueKeys);
          formattedRevenueByWeek = formatChartData(revenueByWeek, 6, "week", revenueKeys);
          formattedRevenueByMonth = formatChartData(revenueByMonth, 6, "month", revenueKeys);
          formattedProductsByDay = formatChartData(productsByDay, 7, "day", productKeys);
          formattedProductsByWeek = formatChartData(productsByWeek, 6, "week", productKeys);
          formattedProductsByMonth = formatChartData(productsByMonth, 6, "month", productKeys); // 6. TRẢ VỀ KẾT QUẢ CUỐI CÙNG
          res.json({
            // Dữ liệu tổng quan
            totalUsers: totalUsers,
            totalOrders: totalOrders,
            totalRevenue: totalRevenue,
            totalDiscount: totalDiscount,
            totalProducts: totalProducts,
            // Dữ liệu cho tất cả các biểu đồ
            chartData: {
              byDay: formattedRevenueByDay,
              byWeek: formattedRevenueByWeek,
              byMonth: formattedRevenueByMonth,
              productsByDay: formattedProductsByDay,
              productsByWeek: formattedProductsByWeek,
              productsByMonth: formattedProductsByMonth
            }
          });
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.error("Dashboard Error:", _t);
          res.status(500).json({
            message: "Lỗi server khi lấy thống kê"
          });
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function getDashboardStats(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();