// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
