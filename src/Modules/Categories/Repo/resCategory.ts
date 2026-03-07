import { API_DOMAIN } from "@/Utils/domain";
import type { Category, ICategoryAPI } from "./Category";
import type {
  addCategorySchemaType,
  UpdateCategorySchemaType,
} from "../Validations/category";

const BASE_URL = `${API_DOMAIN}/categories`;

export const resCategoryAPI: ICategoryAPI = {
  getAll: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Error fetching categories");
    }
    const data: Category[] = await response.json();
    return data;
  },
  getById: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching category");
    }
    const data: Category = await response.json();
    return data;
  },
  create: async (category: addCategorySchemaType) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error add new category");
    }
  },
  update: async (id: string, category: UpdateCategorySchemaType) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error update category");
    }
  },
  delete: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error delete category");
    }
    const data = await response.json();
    return data;
  },
};
