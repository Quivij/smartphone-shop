const axios = require("axios");

const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    const n = req.query.n || 15;

    const response = await axios.get(`http://127.0.0.1:5000/recommend/${userId}?n=${n}`);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Lỗi khi gọi Flask API:", error.message);
    res.status(500).json({ error: "Không thể lấy gợi ý sản phẩm" });
  }
};

module.exports = { getRecommendations };
