import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/users",
  withCredentials: true, // QUAN TRỌNG: để gửi cookie refreshToken
});

// Thêm token vào request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý token hết hạn hoặc lỗi 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu token hết hạn và chưa thử refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh token
        const response = await axios.get(
          "http://localhost:3001/api/users/refresh",
          {
            withCredentials: true, // để gửi cookie refreshToken
          }
        );

        const { accessToken } = response.data;

        // Lưu token mới vào localStorage
        localStorage.setItem("token", accessToken);

        // Gắn token mới vào header Authorization
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry request cũ
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
