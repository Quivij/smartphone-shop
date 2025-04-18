const User = require("../models/User"); // Đảm bảo đường dẫn đúng
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
// Tạo Access Token (hết hạn sau 15 phút)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

// Tạo Refresh Token (hết hạn sau 30 ngày)
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Mật khẩu và xác nhận mật khẩu không khớp" });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo người dùng mới
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Tạo token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Lưu Refresh Token vào cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      accessToken,
    });
  } catch (error) {
    console.error(error); // In lỗi ra console để dễ dàng xác định vấn đề
    res.status(500).json({ message: "Lỗi server" });
  }
};

///////ĐĂNG NHÂP
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem email có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    // Kiểm tra mật khẩu có đúng không
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    // Kiểm tra xem người dùng có xác thực email không
    // if (!user.isVerified) {
    //   return res
    //     .status(400)
    //     .json({ message: "Vui lòng xác thực email của bạn" });
    // }

    // Tạo JWT token
    // Tạo token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Lưu Refresh Token vào cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

////////////////////////LẤY THÔNG TIN NGƯỜI DÙNG
const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy ID người dùng từ token

    // Tìm người dùng theo ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }

    // Trả về thông tin người dùng mà không có mật khẩu
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const { search = "", isAdmin = "all", page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (isAdmin === "true") {
      query.isAdmin = true;
    } else if (isAdmin === "false") {
      query.isAdmin = false;
    }
    // Không cần xét isAdmin === "all" vì nó là trường hợp mặc định, không cần thêm điều kiện

    const skip = (page - 1) * limit;
    const users = await User.find(query)
      .skip(skip)
      .limit(Number(limit))
      .select("-password") // Ẩn password
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      users,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng" });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const { userId } = req.params;

    // Nếu không phải admin thì chỉ được xem thông tin của chính mình
    if (!req.user.isAdmin && req.user.id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xem thông tin người dùng này" });
    }

    // Tìm người dùng theo ID
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

////////////////////XÓA THÔNG TIN NGƯỜI DÙNG
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    res.status(200).json({ message: "Xoá người dùng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá người dùng" });
  }
};

////////TOKEN HET HAN
const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Chưa đăng nhập" });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token không hợp lệ" });

      const newAccessToken = generateAccessToken({
        id: user.id,
        isAdmin: user.isAdmin,
      });

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
// Đăng xuất (Xóa Refresh Token)
const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Đăng xuất thành công" });
};

// Update user profile

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
const updateUser = async (req, res) => {
  try {
    const isAdmin = req.user.isAdmin;
    const userId = isAdmin ? req.params.id : req.user.id;
    const { name, email, phone, address, isAdmin: updatedIsAdmin } = req.body;

    let updateData = { name, email, phone, address };

    // Chỉ admin mới được cập nhật quyền isAdmin
    if (isAdmin && typeof updatedIsAdmin === "boolean") {
      updateData.isAdmin = updatedIsAdmin;
    }

    // Nếu có file avatar (upload mới)
    if (req.file) {
      const avatarPath = `/uploads/${req.file.filename}`;
      updateData.avatar = avatarPath;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      message: "Cập nhật người dùng thành công!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Lỗi cập nhật user:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật người dùng." });
  }
};
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, isAdmin } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const newUser = new User({
      name,
      email,
      password,
      phone,
      address,
      isAdmin,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "Tạo người dùng thành công", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo người dùng" });
  }
};
const getAllUsersRaw = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi xuất tất cả người dùng:", error);
    res.status(500).json({ message: "Lỗi khi lấy tất cả người dùng" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUserInfo,
  getAllUsers,
  getUserDetail,
  deleteUser,
  refreshToken,
  logoutUser,
  createUser,
  getMyProfile,
  getAllUsersRaw,
};
