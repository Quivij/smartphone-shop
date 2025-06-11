// frontend/src/components/Chatbot.jsx
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatbotWidget.css";

function ChatbotWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/chat", {
        message: input,
      });

      setMessages([...newMessages, { role: "assistant", text: res.data.response }]);
    } catch (err) {
      console.error("API Error:", err);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          text: "Xin lỗi, đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-widget">
      {!isOpen ? (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      ) : (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Trợ lý mua sắm</h3>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>Xin chào! Tôi là trợ lý mua sắm điện thoại. Tôi có thể giúp bạn:</p>
                <ul>
                  <li>Tìm điện thoại theo thông số</li>
                  <li>So sánh giá các mẫu điện thoại</li>
                  <li>Tìm kiếm tính năng cụ thể</li>
                  <li>Trả lời câu hỏi về điện thoại</li>
                </ul>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.role === "user" ? "user" : "assistant"}`}
                >
                  <div className="message-content">{msg.text}</div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="chatbot-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              rows={1}
            />
            <button type="submit" disabled={!input.trim() || isLoading}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatbotWidget;
