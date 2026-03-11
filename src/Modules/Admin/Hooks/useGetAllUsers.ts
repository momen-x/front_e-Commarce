import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";
import { resGetByAdminAPI } from "../Repo/resGetByAdmin";
import type { IUser } from "../Repo/Admin";
import { toast } from "react-toastify";

const GET_USERS_QUERY_KEY = "users";

export const useGetAllUsers = (): {
  data: IUser[] | [];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const { data, isLoading, isError, error }: UseQueryResult<IUser[], Error> =
    useQuery({
      queryKey: [GET_USERS_QUERY_KEY],
      queryFn: resGetByAdminAPI.getAllUsers,
      staleTime: 60 * 1000,
      retry: 2,
    });
  return {
    data: data || [],
    isLoading,
    isError,
    error: error || null,
  };
};

export const useDeleteUser = (
  onSuccess: () => void,
): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resGetByAdminAPI.deleteUser(id),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [GET_USERS_QUERY_KEY] });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "error deleting user";
      toast.error(errorMessage);
    },
  });
};
