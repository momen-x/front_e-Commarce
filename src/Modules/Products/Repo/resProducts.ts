import { API_DOMAIN } from "@/Utils/domain";
import type { IProductAPI, Product } from "./Products";
import type {
  addProductSchemaType,
  updateProductSchemaType,
} from "../Validations/Products";

const URL = `${API_DOMAIN}/products`;

export const resProducts: IProductAPI = {
  filterByCategory: async (
    categoryId: string,
    page: number,
    limit?: number
  ) => {
    if (categoryId === "All products") {
      const response = await fetch(`${URL}?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data: Product[] = await response.json();
      return data;
    }

    const response = await fetch(`${URL}/categories/${categoryId}`);

    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    const data: {
      success: boolean;
      count: number;
      category: {
        _id: string;
        title: string;
        description: string;
      };
      products: Product[];
    } = await response.json();
    return data.products;
  },
  getProductAndPageCount: async () => {
    const response = await fetch(`${URL}/count`);
    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    const data: {
      productsCount: number;
      pageCount: number;
    } = await response.json();
    return data;
  },

  getById: async (id: string) => {
    const response = await fetch(`${URL}/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching product");
    }
    const data: Product = await response.json();
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
    const response = await fetch(URL, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error add new product");
    }
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
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error updating product");
    }
  },

  delete: async (id: string) => {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error deleting product");
    }
  },
};
