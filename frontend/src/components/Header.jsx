import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  {
    label: "iPhone",
    link: "/products/iphone",
    subMenu: [
      { label: "iPhone 16 Series", link: "/products/iphone-16" },
      { label: "iPhone 15 Series", link: "/products/iphone-15" },
      { label: "iPhone 14", link: "/products/iphone-14" },
      { label: "iPhone 13", link: "/products/iphone-13" },
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
    link: "/products/dien-thoai-khac",
    subMenu: [
      { label: "Nokia", link: "/products/xiaomi" },
      { label: "Itel", link: "/products/oppo" },
      { label: "Realme", link: "/products/vivo" },
    ],
  },
];

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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

          {/* Icons */}

          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              className="px-3 py-2 outline-none text-gray-700 w-64"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-3 py-2"
            >
              <FaSearch />
            </button>
          </div>

          {/* Icons */}
          <div className="flex space-x-4">
            <FaShoppingCart className="text-gray-600 text-xl cursor-pointer" />
            <FaUser className="text-gray-600 text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
