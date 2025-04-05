// src/hooks/useAuth.js
import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "../api/authApi";

export function useRegisterUser(options = {}) {
  return useMutation({
    mutationFn: registerUser,
    ...options,
  });
}

export function useLoginUser(options = {}) {
  return useMutation({
    mutationFn: loginUser,
    ...options,
  });
}
