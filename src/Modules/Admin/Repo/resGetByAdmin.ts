import api from "@/Utils/axiosInstance";
import type { IGetByAdminAPI } from "./Admin";

export const resGetByAdminAPI: IGetByAdminAPI = {
  getAllUsers: async () => {
    const response = await api.get(`/api/users`);

    const data = response.data;
    return data.users;
  },
  getAllProducts: async () => {
    //be careful here exist pagination
    const response = await api.get(`/api/products`);

    const data = response.data;
    return data;
  },
  getAllCategories: async () => {
    const response = await api.get(`/api/categories`);

    const data = response.data;
    return data;
  },
  deleteUser: async (id: string) => {
    await api.delete(`/api/users/${id}`);
  },
};
