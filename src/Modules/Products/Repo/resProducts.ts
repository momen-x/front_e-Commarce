import type { IProductAPI, Product } from "./Products";
import type {
  addProductSchemaType,
  updateProductSchemaType,
} from "../Validations/Products";
import api from "@/Utils/axiosInstance";

const BASE_URL  = `/api/products`;

export const resProducts: IProductAPI = {
  filterByCategory: async (
    categoryId: string,
    page: number,
    limit?: number,
  ) => {
    if (categoryId === "All products") {
      const response = await api.get(`${BASE_URL }?page=${page}&limit=${limit}`);

      const data: Product[] = response.data;
      return data;
    }

    const response = await api.get(`${BASE_URL }/categories/${categoryId}`);
    const data: {
      success: boolean;
      count: number;
      category: {
        _id: string;
        title: string;
        description: string;
      };
      products: Product[];
    } = response.data;
    return data.products;
  },
  getProductAndPageCount: async () => {
    const response = await api.get(`${BASE_URL }/count`);

    const data: {
      productsCount: number;
      pageCount: number;
    } = response.data;
    return data;
  },

  getById: async (id: string) => {
    const response = await api.get(`${BASE_URL }/${id}`);

    const data: Product = response.data;
    return data;
  },

  create: async (product: addProductSchemaType) => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", String(product.price));
    formData.append("categoryId", product.categoryId);
    if (product.image) {
      formData.append("image", product.image); // key must match "image" in photoUpload.single("image")
    }
    const response = await api.post(BASE_URL , formData);
    return response.data;
  },

  update: async (id: string, product: updateProductSchemaType) => {
    const formData = new FormData();
    formData.append("title", product.title || "");
    formData.append("description", product.description || "");
    formData.append("price", String(product.price));
    formData.append("categoryId", product.categoryId || "");
    if (product.image) {
      formData.append("image", product.image);
    }
    const response = await api.put(`${BASE_URL }/${id}`, formData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`${BASE_URL }/${id}`);
    return response.data;
  },
};
