import {
  useQuery,
  type UseQueryResult,
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { resCategoryAPI } from "../Repo/resCategory";
import type { Category } from "../Repo/Category";
import type {
  addCategorySchemaType,
  UpdateCategorySchemaType,
} from "../Validations/category";

const GET_CATEGORIES_QUERY_KEY = "categories";

export const useGetAllCategories = (): {
  categories: Category[] | [];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const { data, isLoading, isError, error }: UseQueryResult<Category[], Error> =
    useQuery({
      queryKey: [GET_CATEGORIES_QUERY_KEY],
      queryFn: () => resCategoryAPI.getAll(),
      staleTime: 60 * 1000,
      retry: 2,
    });

  return {
    categories: data || [],
    isLoading,
    isError,
    error: error || null,
  };
};

export const useGetCategoryById = (
  id: string
): {
  category: Category | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const { data, isLoading, isError, error }: UseQueryResult<Category, Error> =
    useQuery({
      queryKey: [GET_CATEGORIES_QUERY_KEY, id],
      queryFn: () => resCategoryAPI.getById(id),
      staleTime: 60 * 1000,
      retry: 2,
    });
  return {
    category: data || null,
    isLoading,
    isError,
    error: error || null,
  };
};

export const useAddCategory = (
  onSuccess: () => void,
  onError: () => void
): UseMutationResult<void, Error, addCategorySchemaType> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addCategorySchemaType) => resCategoryAPI.create(data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
    },
    onError: () => {
      onError();
    },
  });
};

export const useUpdateCategory = (
  onSuccess: () => void,
  onError: () => void
): UseMutationResult<
  void,
  Error,
  { id: string; data: UpdateCategorySchemaType }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCategorySchemaType;
    }) => resCategoryAPI.update(id, data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
    },
    onError: () => {
      onError();
    },
  });
};

export const useDeleteCategory = (
  onSuccess: () => void,
  onError: () => void
): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resCategoryAPI.delete(id),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [GET_CATEGORIES_QUERY_KEY] });
    },
    onError: () => {
      onError();
    },
  });
};
