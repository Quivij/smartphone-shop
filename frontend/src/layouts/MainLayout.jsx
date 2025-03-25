import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";

const MainLayout = () => {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    location.pathname.includes("/products") && {
      label: "Sản phẩm",
      href: "/products",
    },
    location.pathname.includes("/phones") && {
      label: "Điện thoại",
      href: "/products/phones",
    },
    location.pathname === "/products/phones/iphone-15-pro-max" && {
      label: "iPhone 15 Pro Max",
    },
  ].filter(Boolean);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Breadcrumb items={breadcrumbItems} />
        <Outlet /> {/* Hiển thị nội dung trang con */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
