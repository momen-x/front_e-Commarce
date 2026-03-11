import axios from "axios";
import { queryClient } from "@/main";
import { API_DOMAIN } from "@/Utils/domain";

const api = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      // Clear user cache
      queryClient.removeQueries({ queryKey: ["me"] });
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
