import { useState } from "react";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleMenu = (menu, event) => {
    event.preventDefault(); // Ngăn chặn chuyển trang khi click
    setOpenMenu(openMenu === menu ? null : menu);
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (submenu, event) => {
    event.preventDefault();
    setOpenSubMenu(openSubMenu === submenu ? null : submenu);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="w-32 flex justify-end">
            <span className="h-12 text-3xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent ml-20">
              HQShop
            </span>
          </div>

          {/* Menu */}
          <nav>
            <ul className="flex space-x-6">
              {/* iPhone */}
              <li className="relative">
                <a
                  href="#"
                  className="font-semibold uppercase text-gray-800"
                  onClick={(e) => toggleMenu("iPhone", e)}
                >
                  iPhone
                </a>
                {openMenu === "iPhone" && (
                  <ul className="absolute left-0 top-12 w-48 bg-white shadow-lg">
                    {/* iPhone 16 Series */}
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800 w-full text-left font-semibold"
                        onClick={(e) => toggleSubMenu("iPhone 16 Series", e)}
                      >
                        iPhone 16 Series ▶
                      </a>
                      {openSubMenu === "iPhone 16 Series" && (
                        <ul className="absolute left-full top-0 w-48 bg-white shadow-lg">
                          <li>
                            <a
                              href="/san-pham/iphone-16e"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              iPhone 16e{" "}
                              <span className="bg-red-500 text-white px-1 text-xs rounded">
                                Mới
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/iphone-16"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              iPhone 16
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/iphone-16-plus"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              iPhone 16 Plus
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/iphone-16-pro"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              iPhone 16 Pro
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/iphone-16-pro-max"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              iPhone 16 Pro Max
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                    {/* iPhone 15 Series */}
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800 font-semibold"
                        onClick={(e) => toggleSubMenu("iPhone 15 Series", e)}
                      >
                        iPhone 15 Series ▶
                      </a>
                      {openSubMenu === "iPhone 15 Series" && (
                        <ul className="absolute left-full top-0 w-48 bg-white shadow-lg">
                          <li>
                            <a
                              href="/san-pham/iphone-15"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              iPhone 15
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/iphone-15-plus"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              iPhone 15 Plus
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                    {/* iPhone 14 */}
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800 font-semibold"
                        onClick={(e) => toggleSubMenu("iPhone 14", e)}
                      >
                        iPhone 14 ▶
                      </a>
                      {openSubMenu === "iPhone 14" && (
                        <ul className="absolute left-full top-0 w-48 bg-white shadow-lg">
                          <li>
                            <a
                              href="/san-pham/iphone-14"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              iPhone 14
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/iphone-14-plus"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              iPhone 14 Plus
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li>
                      <a
                        href="/san-pham/iphone-13"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        iPhone 13
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="relative">
                <a
                  href="#"
                  className="font-semibold uppercase text-gray-800"
                  onClick={(e) => toggleMenu("Watch", e)}
                >
                  Watch
                </a>
                {openMenu === "Watch" && (
                  <ul className="absolute left-0 top-12 w-48 bg-white shadow-lg">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        Apple Watch S10
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        Apple Watch Ultra
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        Apple Watch S9
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        Apple Watch SE
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* iPad */}
              <li className="relative">
                <a
                  href="#"
                  className="font-semibold uppercase text-gray-800"
                  onClick={(e) => toggleMenu("iPad", e)}
                >
                  iPad
                </a>
                {openMenu === "iPad" && (
                  <ul className="absolute left-0 top-12 w-48 bg-white shadow-lg">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        iPad Pro
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        iPad Air M3{" "}
                        <span className="bg-red-500 text-white px-1 text-xs rounded">
                          Mới
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        iPad Air M2
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        iPad Gen 11 A16{" "}
                        <span className="bg-red-500 text-white px-1 text-xs rounded">
                          Mới
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        iPad Gen 10 (10.9")
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        iPad Gen 9 (10.2")
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                      >
                        iPad mini
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Samsung */}
              <li className="relative">
                <a
                  href="#"
                  className="font-semibold uppercase text-gray-800"
                  onClick={(e) => toggleMenu("Samsung", e)}
                >
                  Samsung
                </a>
                {openMenu === "Samsung" && (
                  <ul className="absolute left-0 top-12 w-48 bg-white shadow-lg">
                    {/* Samsung Galaxy S24 Series */}
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800 w-full text-left font-semibold"
                        onClick={(e) =>
                          toggleSubMenu("Samsung Galaxy S25 Series", e)
                        }
                      >
                        Galaxy S25 Series ▶
                      </a>
                      {openSubMenu === "Samsung Galaxy S25 Series" && (
                        <ul className="absolute left-full top-0 w-48 bg-white shadow-lg">
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-s24"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy S25
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-s24-plus"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy S25 Plus
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-s24-ultra"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy S25 Ultra
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                    {/* Samsung Galaxy S23 Series */}
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800 font-semibold"
                        onClick={(e) =>
                          toggleSubMenu("Samsung Galaxy S24 Series", e)
                        }
                      >
                        Galaxy S24 Series ▶
                      </a>
                      {openSubMenu === "Samsung Galaxy S24 Series" && (
                        <ul className="absolute left-full top-0 w-48 bg-white shadow-lg">
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-s24-fe"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy S24 FE
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-s23"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy S24
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-s23-plus"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy S24 Plus
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-s23-ultra"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy S24 Ultra
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                    {/* Samsung Galaxy Z Series */}
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800 font-semibold"
                        onClick={(e) =>
                          toggleSubMenu("Samsung Galaxy Z Series", e)
                        }
                      >
                        Galaxy Z Series ▶
                      </a>
                      {openSubMenu === "Samsung Galaxy Z Series" && (
                        <ul className="absolute left-full top-0 w-48 bg-white shadow-lg">
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-z-fold5"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy Z Fold5
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-z-flip5"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy Z Flip5
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                    {/* Samsung Galaxy A Series */}
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800 font-semibold"
                        onClick={(e) =>
                          toggleSubMenu("Samsung Galaxy A Series", e)
                        }
                      >
                        Galaxy A Series ▶
                      </a>
                      {openSubMenu === "Samsung Galaxy A Series" && (
                        <ul className="absolute left-full top-0 w-48 bg-white shadow-lg">
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-a54"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy A54
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-a34"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy A34
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                    {/* Samsung Galaxy M Series */}
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-200 text-gray-800 font-semibold"
                        onClick={(e) =>
                          toggleSubMenu("Samsung Galaxy M Series", e)
                        }
                      >
                        Galaxy M Series ▶
                      </a>
                      {openSubMenu === "Samsung Galaxy M Series" && (
                        <ul className="absolute left-full top-0 w-48 bg-white shadow-lg">
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-m14"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy M14
                            </a>
                          </li>
                          <li>
                            <a
                              href="/san-pham/samsung-galaxy-m23"
                              className="block px-4 py-2 hover:bg-gray-200 text-gray-800"
                            >
                              Galaxy M23
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>

              <li className="relative">
                <a
                  href="#"
                  className="font-semibold uppercase text-gray-800"
                  onClick={(e) => toggleMenu("DienThoai", e)}
                >
                  Điện thoại
                </a>
                {openMenu === "DienThoai" && (
                  <div className="absolute left-0 top-12 w-[600px] bg-white shadow-lg p-4 grid grid-cols-3 gap-4">
                    {/* Nokia */}
                    <div>
                      <h3 className="font-bold text-black mb-2">Nokia</h3>
                      <ul>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Nokia HDM 105 4G
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Nokia 105 4G Pro
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Nokia 110 4G Pro
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Nokia 220 4G
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Nokia 3210 4G
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Itel */}
                    <div>
                      <h3 className="font-bold text-black mb-2">Itel</h3>
                      <ul>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Itel it9211
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Itel it9310
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Itel it2600
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Itel it8010
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* Realme */}
                    <div>
                      <h3 className="font-bold text-black mb-2">Realme</h3>
                      <ul>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Realme Note Series
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block text-gray-800 hover:text-gray-500"
                          >
                            Realme C Series
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex space-x-4 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Bạn cần tìm gì?"
                className="border-b-2 border-gray-300 focus:outline-none px-2 py-1"
              />
              <FaSearch className="absolute right-2 top-1 text-gray-500" />
            </div>
            <a href="#" className="text-gray-800">
              <FaUser className="text-xl" />
            </a>
            <a href="#" className="text-gray-800">
              <FaShoppingCart className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
