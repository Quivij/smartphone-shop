// src/hooks/useCreateUser.js
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../api/userApi";

export function useCreateUser(options = {}) {
  return useMutation({
    mutationFn: createUser,
    ...options,
  });
}
