import { useMutation } from "@tanstack/react-query";
import api from "../api/api";

export const validateCoupon = async ({ code, orderTotal }) => {
  const res = await api.post("/coupons/validate", { code, orderTotal });
  return res.data;
};

export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: validateCoupon,
  });
};
