import api from "./api"; // import instance api của bạn

export const loginUser = async ({ email, password }) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const registerUser = async ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  const response = await api.post("/register", {
    name,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const fetchProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/profile", data);
  return response.data;
};
