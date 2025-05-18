const { classifyIntent } = require("../models/IntentClassifier");
const Product = require("../models/Product");
const { askGemini } = require("../utils/gemini");

const greetings = ["xin chào", "chào", "hello", "hêlo", "hi"];
const buyingKeywords = ["mua", "tư vấn", "gợi ý", "cần", "muốn"];

const brandMap = {
  iphone: "Apple",
  apple: "Apple",
  samsung: "Samsung",
  xiaomi: "Xiaomi",
  oppo: "Oppo",
  vivo: "Vivo",
  honor: "HONOR",
  realme: "Realme",
  itel: "Itel",
  nokia: "Nokia",
};

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim();
}

function isGreeting(msg) {
  const norm = normalizeText(msg);
  return greetings.some((g) => norm.includes(normalizeText(g)));
}

function extractBrand(msg) {
  const norm = normalizeText(msg);
  for (const key in brandMap) {
    if (norm.includes(key)) return brandMap[key];
  }
  return null;
}

exports.chatWithBot = async (req, res) => {
  const { message } = req.body;
  const userMessage = message || "";
  const normMessage = normalizeText(userMessage);

  try {
    // Khởi tạo session context nếu chưa có
    req.session.chatContext ??= {
      previousQuestion: "",
      desiredBrand: null,
      desiredProduct: null,
      desiredPrice: null,
    };

    const context = req.session.chatContext;

    // Xử lý lời chào
    if (isGreeting(userMessage)) {
      context.previousQuestion = "greeting";
      return res.json({
        reply:
          "👋 Chào bạn! Bạn muốn mình tư vấn dòng điện thoại nào? (iPhone, Samsung, Xiaomi...)",
      });
    }

    // Phân tích intent của người dùng
    const intent = await classifyIntent(userMessage);

    if (intent === "buying") {
      context.previousQuestion = "buying";
      return res.json({
        reply:
          "📱 Bạn muốn mua điện thoại hãng nào? (iPhone, Samsung...) Và khoảng giá bao nhiêu?",
      });
    }

    // Trích xuất thông tin hãng, sản phẩm và giá từ tin nhắn
    const brand = extractBrand(userMessage);
    if (brand) context.desiredBrand = brand;

    const productMatch = userMessage.match(
      /(iphone|samsung|ipad|galaxy|watch|oppo|realme|vivo|honor|nokia|xiaomi|itel)[\w\s\d\-]*/i
    );
    if (productMatch) {
      context.desiredProduct = productMatch[0].trim();
    }

    const priceMatch = normMessage.match(/(\d+)\s*(tr|trieu|m)/);
    if (priceMatch) {
      context.desiredPrice = parseInt(priceMatch[1]) * 1_000_000;
    }

    // Nhận dạng khoảng giá bằng chữ
    const priceWords = {
      "2 triệu": 2_000_000,
      "3 triệu": 3_000_000,
      "5 triệu": 5_000_000,
      "dưới 10 triệu": 10_000_000,
      "trên 10 triệu": 11_000_000,
      "hơn 10 triệu": 11_000_000,
      "trên 15 triệu": 16_000_000,
      "hơn 15 triệu": 16_000_000,
      "trên 16 triệu": 17_000_000,
      "hơn 16 triệu": 17_000_000,
    };

    for (const [key, value] of Object.entries(priceWords)) {
      if (normMessage.includes(normalizeText(key))) {
        context.desiredPrice = value;
        break;
      }
    }

    // Nhận diện khoảng giá (trên, hơn, khoảng...)
    const approxPriceMatch = normMessage.match(
      /(tren|hon|khoang|khoảng)\s*(\d+)\s*(tr|trieu|m)?/
    );
    if (approxPriceMatch) {
      const price = parseInt(approxPriceMatch[2]) * 1_000_000;
      context.desiredPrice = price;
    }

    // ❓ Nếu hỏi về camera và đã có tên sản phẩm
    if (intent === "camera_quality" && context.desiredProduct) {
      const product = await Product.findOne({
        name: new RegExp(context.desiredProduct, "i"),
      });
      if (product) {
        return res.json({
          reply: `📸 ${product.name} có thông số camera: ${
            product.specifications?.camera || "chưa cập nhật."
          }`,
        });
      }
      return res.json({
        reply: `❓ Mình chưa tìm thấy thông tin camera của sản phẩm "${context.desiredProduct}".`,
      });
    }

    // ❓ Nếu hỏi về bảo hành
    if (intent === "warranty_info" && context.desiredProduct) {
      return res.json({
        reply: `🔧 ${context.desiredProduct} được bảo hành chính hãng 12 tháng tại cửa hàng bạn nhé.`,
      });
    }

    // ✅ Nếu có hãng + giá → tìm sản phẩm phù hợp
    if (context.desiredBrand && context.desiredPrice) {
      const products = await Product.find({
        brand: new RegExp(context.desiredBrand, "i"),
        name: new RegExp(context.desiredProduct || "iphone", "i"), // Thêm điều kiện lọc theo tên
        "variants.price": { $lte: context.desiredPrice + 2_000_000 },
      })
        .sort({ "variants.0.price": 1 })
        .limit(3);

      if (products.length === 0) {
        return res.json({
          reply: `❌ Không tìm thấy sản phẩm phù hợp với hãng ${
            context.desiredBrand
          } và khoảng giá ~${context.desiredPrice.toLocaleString("vi-VN")}₫.`,
        });
      }

      const reply = products
        .map((p) => {
          const cheapest = p.variants.reduce((a, b) =>
            a.price < b.price ? a : b
          );
          return `✅ ${p.name} (${cheapest.storage}, ${
            cheapest.color
          }) - ${cheapest.price.toLocaleString("vi-VN")}₫\n👉 /product/${
            p._id
          }`;
        })
        .join("\n\n");

      context.previousQuestion = "price_filter";
      return res.json({ reply });
    }

    // ✅ Nếu chỉ có brand
    if (context.desiredBrand && !context.desiredPrice) {
      return res.json({
        reply: `💡 Bạn muốn mua điện thoại ${context.desiredBrand} trong tầm giá khoảng bao nhiêu?`,
      });
    }

    // Người dùng nói "tư vấn mua" nhưng chưa nói hãng
    if (
      buyingKeywords.some((k) => normMessage.includes(normalizeText(k))) &&
      !context.desiredBrand
    ) {
      context.previousQuestion = "unclear";
      return res.json({
        reply:
          "📱 Bạn muốn mua điện thoại hãng nào? (iPhone, Samsung...) Và khoảng giá bao nhiêu?",
      });
    }

    // Fallback: hỏi Gemini
    const geminiReply = await askGemini(userMessage);
    return res.json({
      reply:
        geminiReply ||
        (context.desiredBrand
          ? `💡 Bạn muốn mua điện thoại ${context.desiredBrand} giá khoảng bao nhiêu?`
          : "🤖 Mình chưa hiểu rõ yêu cầu của bạn. Bạn muốn tư vấn sản phẩm nào ạ?"),
    });
  } catch (error) {
    console.error("❌ Lỗi trong chatWithBot:", error);
    return res.status(500).json({
      reply: "😓 Xin lỗi, hệ thống đang gặp sự cố.",
    });
  }
};
