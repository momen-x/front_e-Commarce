import { API_DOMAIN } from "@/Utils/domain";

import axios from "axios";

const api = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default api;
