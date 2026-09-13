import {
  useQuery,
  type UseQueryResult,
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  addProductSchemaType,
  updateProductSchemaType,
} from "../Validations/Products";

import type { Product } from "../Repo/Products";
import { resProducts } from "../Repo/resProducts";
import { toast } from "react-toastify";
import type { Category } from "@/Modules/Categories/Repo/Category";

const GET_PRODUCTS_QUERY_KEY = "products";

export const useFilteringProductsByCategory = (
  categoryId: string,
  page: number,
  limit?: number,
): {
  data: {
    success: boolean;
    count: number;
    pageCount: number;
    category: Category;
    products: Product[];
  };
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<
    {
      success: boolean;
      count: number;
      pageCount: number;
      category: Category;
      products: Product[];
    },
    Error
  > = useQuery({
    queryKey: [GET_PRODUCTS_QUERY_KEY, categoryId, page],
    queryFn: () => resProducts.filterByCategory(categoryId, page, limit),
    staleTime: 60 * 1000,
    retry: 2,
  });

  return {
    data: data || {
      success: false,
      count: 0,
      pageCount: 0,
      category: {
        id: "",
        title: "",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      products: [],
    },
    isLoading,
    isError,
    error: error || null,
  };
};

export const useGetProductsAndPageCount = (): {
  pageCount: number;
  productsCount: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{ pageCount: number; productsCount: number }, Error> =
    useQuery({
      queryKey: [GET_PRODUCTS_QUERY_KEY],
      queryFn: () => resProducts.getProductAndPageCount(),
      staleTime: 60 * 1000,
      retry: 2,
    });
  return {
    pageCount: data?.pageCount || 0,
    productsCount: data?.productsCount || 0,
    isLoading,
    isError,
    error: error || null,
  };
};

export const useGetProductById = (
  id: string,
): {
  product: Product | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const { data, isLoading, isError, error }: UseQueryResult<Product, Error> =
    useQuery({
      queryKey: [GET_PRODUCTS_QUERY_KEY, id],
      queryFn: () => resProducts.getById(id),
      staleTime: 60 * 1000,
      retry: 2,
    });

  return {
    product: data || undefined,
    isLoading,
    isError,
    error: error || null,
  };
};

export const useAddProduct = (
  onSuccess: () => void,
): UseMutationResult<void, Error, addProductSchemaType> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addProductSchemaType) => resProducts.create(data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_QUERY_KEY] });
    },
    onError: (error) => {
      console.error("the error is : ", error);
      toast.error(
        error instanceof Error ? error.message : "error adding product",
      );
    },
  });
};

export const useUpdateProduct = (
  onSuccess: () => void,
): UseMutationResult<
  void,
  Error,
  { id: string; data: updateProductSchemaType }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: updateProductSchemaType }) =>
      resProducts.update(id, data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_QUERY_KEY] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "error updating product",
      );
      console.error("the error is : ");
    },
  });
};

export const useDeleteProduct = (
  onSuccess: () => void,
): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resProducts.delete(id),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS_QUERY_KEY] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "error deleting product",
      );
      console.error("the error is : ", error);
    },
  });
};
