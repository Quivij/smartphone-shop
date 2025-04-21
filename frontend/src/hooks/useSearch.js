import axios from "axios";
import { useState } from "react";

export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Thêm state để lưu thông báo lỗi

  const search = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null); // Xóa lỗi trước khi tìm kiếm mới
    try {
      const res = await axios.get(
        `http://localhost:3001/api/products/search?query=${query}`
      );

      // Kiểm tra nếu response trả về thành công (status 200)
      if (res.status === 200) {
        setResults(res.data);
      } else {
        setError("Không thể tải kết quả tìm kiếm.");
      }
    } catch (error) {
      // Kiểm tra lỗi và hiển thị thông báo rõ ràng
      console.error("Search error:", error);
      if (error.response) {
        // Lỗi trả về từ server (ví dụ: lỗi 500)
        setError(`Lỗi từ server: ${error.response.status}`);
      } else if (error.request) {
        // Lỗi kết nối, không có phản hồi từ server
        setError("Không thể kết nối với server.");
      } else {
        // Lỗi khác
        setError("Đã xảy ra lỗi không xác định.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search }; // Trả về cả thông báo lỗi
};
