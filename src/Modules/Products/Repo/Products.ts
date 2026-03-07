import type {
  addProductSchemaType,
  updateProductSchemaType,
} from "../Validations/Products";

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: {
    public_id: null | string;
    url: string;
  };
  categoryId: {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductAPI {
  // getAll: (pageNum: number) => Promise<Product[]>;
  filterByCategory: (
    categoryId: string,
    page: number,
    limit?: number
  ) => Promise<Product[]>;
  getProductAndPageCount: () => Promise<{
    pageCount: number;
    productsCount: number;
  }>;
  getById: (id: string) => Promise<Product>;
  create: (product: addProductSchemaType) => Promise<void>;
  update: (id: string, product: updateProductSchemaType) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
