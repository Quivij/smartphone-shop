// src/api/userApi.js
import axiosClient from "./axiosClient";

export const createUser = async (userData) => {
  const response = await axiosClient.post("/users", userData);
  return response.data;
};
