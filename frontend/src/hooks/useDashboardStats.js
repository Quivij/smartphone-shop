import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useDashboardStats = (token) => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
};
