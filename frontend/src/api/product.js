import api from "../api/api";

export const getAllProducts = async (params) => {
  const res = await api.get("/products", { params });
  return res.data;
};

export const deleteProductById = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
export const createProduct = async (formData) => {
  const { data } = await api.post("/products", formData);
  return data;
};

export const updateProduct = async ({ id, formData }) => {
  const { data } = await api.put(`/products/${id}`, formData);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// services/product.js
export const deleteMultipleProducts = async (ids) => {
  return api.delete("/products/delete-many", {
    data: { ids }, // << Phải có 'data' trong DELETE
  });
};
export const allProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};
