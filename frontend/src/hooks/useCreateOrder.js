// src/hooks/useCreateOrder.js
import { useMutation } from "@tanstack/react-query";
import api from "../api/api";

const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
