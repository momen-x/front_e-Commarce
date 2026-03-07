import {
  useQuery,
  type UseQueryResult,
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import type { UserData } from "../Repo/User";
import { resUser } from "../Repo/resUser";
import type { ChangePasswordType } from "../Validations/ChangePassword";

export const USER_KEY = "user";

export const useGetUserById = (
  id: string,
): {
  data: UserData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const { data, isLoading, isError, error }: UseQueryResult<UserData, Error> =
    useQuery({
      queryKey: [USER_KEY, id],
      queryFn: () => resUser.getById(id),
    });
  return { data: data || undefined, isLoading, isError, error };
};

export const useUpdatePassword = (
  onSuccess: () => void,
  onError: () => void,
): UseMutationResult<void, Error, ChangePasswordType> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChangePasswordType) => resUser.updatePassword(data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
    },
    onError: () => onError(),
  });
};
