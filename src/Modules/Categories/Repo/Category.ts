import type {
  addCategorySchemaType,
  UpdateCategorySchemaType,
} from "../Validations/category";

export interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryAPI {
  getAll: () => Promise<Category[]>;
  getById: (id: string) => Promise<Category>;
  create: (category: addCategorySchemaType) => Promise<void>;
  update: (id: string, category: UpdateCategorySchemaType) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
