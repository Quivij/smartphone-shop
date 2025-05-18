import { useState, useEffect, useRef } from "react";

export default function ChatbotWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);

  // Khởi tạo sessionId
  useEffect(() => {
    let stored = localStorage.getItem("sessionId");
    if (!stored) {
      stored = crypto.randomUUID();
      localStorage.setItem("sessionId", stored);
    }
    setSessionId(stored);
  }, []);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:3001/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, sessionId }),
      });

      const data = await res.json();
      const botMessage = { role: "bot", text: data.reply };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ Gửi thất bại:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Lỗi máy chủ, vui lòng thử lại sau." },
      ]);
    }
  };

  const handleBotClick = (text) => {
    const match = text.match(/\/product\/([a-zA-Z0-9]+)/);
    if (match) {
      const productId = match[1];
      window.location.href = `/product/${productId}`;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Nút mở/đóng */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256.064 32C114.624 32 0 133.12 0 260.928c0 71.776 36.32 136.128 96.832 178.016v40.768c0 7.52 6.112 13.696 13.664 13.76a13.71 13.71 0 0 0 8.96-3.2l51.456-42.528c26.784 7.872 55.136 11.968 85.152 11.968 141.44 0 256-101.12 256-228.928C512 133.12 397.504 32 256.064 32zm14.464 281.6-60.064-64-134.912 64L224.064 174.4l60.064 64 134.944-64-148.544 139.2z" />
        </svg>
      </button>

      {/* Hộp chat */}
      {isOpen && (
        <div className="w-96 h-[500px] bg-white rounded-2xl shadow-2xl p-4 flex flex-col mt-4">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            🤖 Tư vấn sản phẩm
          </h2>

          <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm p-2 max-w-[80%] rounded-xl whitespace-pre-line break-words ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end text-right"
                    : "bg-gray-100 self-start cursor-pointer hover:bg-gray-200"
                }`}
                onClick={() =>
                  msg.role === "bot" ? handleBotClick(msg.text) : null
                }
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex">
            <input
              className="flex-1 border rounded-l-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi về sản phẩm..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
