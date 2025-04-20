import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import AllProducts from "../components/AllProducts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProfilePage from "../pages/ProfilePage";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminProduct from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";

import CreateProduct from "../pages/admin/products/CreateProduct";
import EditProduct from "../pages/admin/products/EditProduct";

import AdminUser from "../pages/admin/AdminUser";

import EditUser from "../pages/admin/users/EditUser";
import CreateUserPage from "../pages/admin/users/CreateUserPage";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:category" element={<Products />} />
          <Route
            path="products/:category/:subcategory"
            element={<Products />}
          />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products">
            <Route index element={<AdminProduct />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>
          <Route path="orders" element={<Orders />} />
          <Route path="users">
            <Route index element={<AdminUser />} />
            <Route path="edit/:id" element={<EditUser />} />
            <Route path="create" element={<CreateUserPage />} />
          </Route>

          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
