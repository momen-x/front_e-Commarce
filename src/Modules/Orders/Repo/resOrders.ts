import api from "@/Utils/axiosInstance";
import type { IGetOrder } from "@/Modules/Orders/Repo/Orders";

const BASE_URL = "/api/orders";

export const resOrders: IGetOrder = {
  getOrders: async () => {
    const response = await api.get(`${BASE_URL}/user-orders`);
    return response.data;
  },
  getAllOrdersByAdmin: async () => {
    const response = await api.get("http://localhost:5000/api/orders");
    return response.data;
  },
};
