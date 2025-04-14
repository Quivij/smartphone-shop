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

const updateUser = async (req, res) => {
  try {
    // Lấy token từ header
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Vui lòng cung cấp token hợp lệ" });
    }

    // Giải mã token và lấy thông tin người dùng
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const isAdmin = decoded.isAdmin; // Kiểm tra quyền admin

    // Tìm người dùng thực hiện yêu cầu
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Lấy thông tin cập nhật từ body
    const {
      userIdToUpdate,
      name,
      email,
      password,
      newPassword,
      isAdminUpdate,
    } = req.body;

    // Nếu có yêu cầu thay đổi quyền admin
    if (isAdminUpdate !== undefined) {
      if (!isAdmin) {
        return res
          .status(403)
          .json({ message: "Bạn không có quyền thay đổi quyền admin" });
      }

      const userToUpdate = await User.findById(userIdToUpdate);
      if (!userToUpdate) {
        return res
          .status(404)
          .json({ message: "Người dùng cần cập nhật không tồn tại" });
      }

      // Cập nhật quyền admin
      userToUpdate.isAdmin = isAdminUpdate;
      await userToUpdate.save();

      return res.status(200).json({
        message: "Cập nhật quyền admin thành công",
        user: userToUpdate,
      });
    }

    // Nếu có mật khẩu mới, cần kiểm tra mật khẩu cũ
    if (newPassword) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu cũ không chính xác" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    // Cập nhật các thông tin khác (tên, email)
    if (name) user.name = name;
    if (email) user.email = email;

    // Lưu lại thông tin đã cập nhật
    await user.save();

    res.status(200).json({ message: "Cập nhật thông tin thành công", user });
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
    // Kiểm tra quyền admin
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xem danh sách người dùng" });
    }

    // Lấy danh sách tất cả người dùng (trừ mật khẩu)
    const users = await User.find({}, "-password");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
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
    // Lấy thông tin từ token (đã được middleware xác thực)
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin; // Kiểm tra quyền admin

    // Nếu không phải admin, từ chối yêu cầu
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xóa tài khoản" });
    }

    // Lấy userId cần xóa từ request body hoặc query
    const { userIdToDelete } = req.body;

    // Kiểm tra xem người dùng cần xóa có tồn tại không
    const userToDelete = await User.findById(userIdToDelete);
    if (!userToDelete) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Xóa người dùng
    await userToDelete.deleteOne();

    res.status(200).json({ message: "Tài khoản đã bị xóa thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
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
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy ID người dùng từ middleware xác thực
    const { name, email, phone, address } = req.body;

    let updateData = { name, email, phone, address };

    // Nếu có file avatar mới được upload
    if (req.file) {
      const avatarPath = `/uploads/${req.file.filename}`;
      updateData.avatar = avatarPath;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, // Trả về dữ liệu mới nhất
      runValidators: true,
    }).select("-password"); // Không trả về password

    res.status(200).json({
      message: "Cập nhật thông tin thành công!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Lỗi cập nhật profile:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật profile." });
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
  updateUserProfile,
  getMyProfile,
};
