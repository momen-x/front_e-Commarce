import type { Category, ICategoryAPI } from "./Category";
import type {
  addCategorySchemaType,
  UpdateCategorySchemaType,
} from "../Validations/category";
import api from "@/Utils/axiosInstance";

const BASE_URL = `/api/categories`;

export const resCategoryAPI: ICategoryAPI = {
  getAll: async () => {
    const response = await api.get(BASE_URL);

    const data: Category[] = response.data;
    return data;
  },
  getById: async (id: string) => {
    const response = await api.get(`${BASE_URL}/${id}`);

    const data: Category = response.data;
    return data;
  },
  create: async (category: addCategorySchemaType) => {
    const response = await api.post(BASE_URL, category);
    return response.data;
  },
  update: async (id: string, category: UpdateCategorySchemaType) => {
    const response = await api.put(`${BASE_URL}/${id}`, category);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`${BASE_URL}/${id}`);

    const data = response.data;
    return data;
  },
};
