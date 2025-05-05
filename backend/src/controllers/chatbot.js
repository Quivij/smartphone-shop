const Product = require("../models/Product");

exports.chatbot = async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res
      .status(400)
      .json({ reply: "Bạn vui lòng nhập nội dung cần tư vấn." });
  }

  try {
    // Tìm sản phẩm có tên khớp với tin nhắn người dùng
    const products = await Product.find({
      name: { $regex: message, $options: "i" },
    }).limit(5); // giới hạn kết quả

    if (products.length === 0) {
      return res.json({
        reply: "Xin lỗi, tôi không tìm thấy sản phẩm phù hợp.",
      });
    }

    // Tạo nội dung phản hồi
    const reply = products
      .map((p) => {
        const v = p.variants?.[0] || {};
        return `📱 ${p.name} ${
          v.storage || ""
        } - Giá: ${v.price?.toLocaleString()}đ`;
      })
      .join("\n");

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res
      .status(500)
      .json({ reply: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau." });
  }
};
