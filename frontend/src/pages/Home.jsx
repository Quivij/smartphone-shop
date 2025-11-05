import React, {useEffect, useState} from "react";
import ProductSlider from "../components/ProductSlider";
import BannerSlider from "../components/BannerSlider";
import ProductTabs from "../components/ProductTabs";
import RecommendedProducts from "../components/recommendedProduct";

const Home = () => {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      console.log("ĐỐI TƯỢNG USER TỪ LOCALSTORAGE:", JSON.parse(userData));
    }
  }, []);
  return (
    <div>
      <BannerSlider />
      <h1 className="text-2xl font-bold text-center mt-5">
        Danh sách sản phẩm nổi bật
      </h1>
      <ProductSlider />

      {user && (
        <div className="mt-10">
          <RecommendedProducts userId={user.id} />
        </div>
      )}

      {/* <ProductTabs /> */}
    </div>
  );
};

export default Home;
