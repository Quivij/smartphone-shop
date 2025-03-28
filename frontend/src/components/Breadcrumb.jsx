import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");

  // Ẩn breadcrumb nếu đang ở trang chủ
  if (paths.length === 0) return null;

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <Link to="/" className="hover:underline">
        Home
      </Link>{" "}
      /
      <Link to="/products" className="hover:underline">
        Products
      </Link>
      {paths.length > 1 &&
        paths.slice(1).map((path, index) => (
          <span key={index}>
            {" / "}
            <Link
              to={`/${paths.slice(0, index + 2).join("/")}`}
              className="hover:underline"
            >
              {path}
            </Link>
          </span>
        ))}
    </nav>
  );
};

export default Breadcrumb;
