import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import AllProducts from "../components/AllProducts";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<Products />} />
          <Route
            path="/products/:category/:subcategory"
            element={<Products />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
