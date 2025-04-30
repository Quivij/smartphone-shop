import { FaUser, FaShoppingCart, FaSearch, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useUserStore } from "../store/useUserStore";
import SearchDropdown from "./SearchDropdown"; // điều chỉnh path nếu cần
import { useCartStore } from "../store/useCartStore";

const menuItems = [
  {
    label: "iPhone",
    link: "/products/iphone",
    subMenu: [
      { label: "iPhone 16 Series", link: "/products/iphone/16series" },
      { label: "iPhone 15 Series", link: "/products/iphone/15series" },
      { label: "iPhone 14", link: "/products/iphone/14series" },
      { label: "iPhone 13", link: "/products/iphone/13series" },
    ],
  },
  {
    label: "Samsung",
    link: "/products/samsung",
    subMenu: [
      {
        label: "Galaxy S24 Ultra",
        link: "/products/samsung-s24-ultra",
        new: true,
      },
      { label: "Galaxy S23 Ultra", link: "/products/samsung-s23-ultra" },
      { label: "Galaxy Z Flip 5", link: "/products/samsung-z-flip5" },
      { label: "Galaxy Z Fold 5", link: "/products/samsung-z-fold5" },
      { label: "Galaxy A Series", link: "/products/samsung-a-series" },
    ],
  },
  {
    label: "iPad",
    link: "/products/ipad",
    subMenu: [
      { label: "iPad Pro", link: "/products/ipad/ipad-pro" },
      { label: "iPad Air M3", link: "/products/ipad/ipad-air-m3", new: true },
      { label: "iPad Air M2", link: "/products/ipad/ipad-air-m2" },
      {
        label: "iPad Gen 11 A16",
        link: "/products/ipad/ipad-gen-11",
        new: true,
      },
      { label: "iPad Gen 10", link: "/products/ipad/ipad-gen-10" },
      { label: "iPad Gen 9", link: "/products/ipad/ipad-gen-9" },
      { label: "iPad mini", link: "/products/ipad/ipad-mini" },
    ],
  },
  {
    label: "Watch",
    link: "/products/watch",
    subMenu: [
      { label: "Apple Watch S10", link: "/products/apple-watch-s10" },
      { label: "Apple Watch Ultra", link: "/products/apple-watch-ultra" },
      { label: "Apple Watch S9", link: "/products/apple-watch-s9" },
      { label: "Apple Watch SE", link: "/products/apple-watch-se" },
    ],
  },
  {
    label: "Điện thoại",
    link: "/products/dienthoai",
    subMenu: [
      { label: "Nokia", link: "/products/nokia" },
      { label: "Itel", link: "/products/itel" },
      { label: "Realme", link: "/products/realme" },
    ],
  },
];

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  // Lấy user và avatar từ Zustand store
  const { user, clearUser } = useUserStore();
  const avatar = user?.avatar;
  const fullAvatarUrl = avatar?.startsWith("http")
    ? avatar
    : avatar
    ? `http://localhost:3001${avatar}?t=${Date.now()}`
    : null;

  const { handleLogout } = useLogout();

  const handleLogoutClick = () => {
    handleLogout();
    clearUser(); // Xóa thông tin người dùng khi đăng xuất
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="w-32">
            <span className="text-3xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
              HQShop
            </span>
          </div>

          {/* Menu */}
          <nav>
            <ul className="flex space-x-6">
              {menuItems.map((item) => (
                <li key={item.label} className="relative group">
                  <Link
                    to={item.link}
                    className="font-semibold uppercase text-gray-800"
                  >
                    {item.label}
                  </Link>
                  {item.subMenu && (
                    <ul className="absolute left-0 top-full w-48 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {item.subMenu.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            to={sub.link}
                            className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                          >
                            {sub.label}
                            {sub.new && (
                              <span className="bg-red-500 text-white px-1 text-xs rounded ml-1">
                                Mới
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Search */}
          <div className="w-72">
            <SearchDropdown />
          </div>

          {/* Icons */}
          <div className="flex space-x-4 items-center">
            {/* Giỏ hàng và các icon khác */}
            <div className="relative flex items-center space-x-2 cursor-pointer">
              <FaShoppingCart className="text-gray-600 text-xl" />
              <Link to="/cart">Giỏ hàng</Link>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {/* User */}
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {avatar ? (
                  <img
                    src={fullAvatarUrl}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-600 text-xl" />
                )}
                <span className="text-gray-600">
                  {user ? user.name : "Đăng nhập/Đăng ký"}
                </span>
                <FaCaretDown
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul className="text-gray-700">
                    {user ? (
                      <>
                        <li className="p-3 hover:bg-gray-100 cursor-pointer">
                          <Link to="/profile" className="block w-full h-full">
                            Tài khoản của tôi
                          </Link>
                        </li>
                        <li className="p-3 hover:bg-gray-100 cursor-pointer">
                          <Link to="/orders/my" className="block w-full h-full">
                            Đơn hàng
                          </Link>
                        </li>
                        {user.isAdmin && (
                          <li className="p-3 hover:bg-gray-100 cursor-pointer">
                            <Link to="/admin" className="block w-full h-full">
                              Quản lý hệ thống
                            </Link>
                          </li>
                        )}
                        <li
                          className="p-3 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogoutClick}
                        >
                          Đăng xuất
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="p-3 hover:bg-gray-100 cursor-pointer">
                          <Link to="/login" className="block w-full h-full">
                            Đăng nhập
                          </Link>
                        </li>
                        <li className="p-3 hover:bg-gray-100 cursor-pointer">
                          <Link to="/register" className="block w-full h-full">
                            Đăng ký
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
