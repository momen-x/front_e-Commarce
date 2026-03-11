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
import { toast } from "react-toastify";
import type {
  AddOrChangeUserImageType,
  UpdateUserType,
} from "../Validations/UpdateUserData";

export const USER_KEY = "me";

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
      queryKey: ["user", id],
      queryFn: () => resUser.getById(id),
      retry: false,
      staleTime: Infinity, // ← don't refetch unless invalidated
    });
  return { data: data || undefined, isLoading, isError, error };
};

export const useUpdatePassword = (
  onSuccess: () => void,
): UseMutationResult<void, Error, ChangePasswordType> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => resUser.updatePassword(data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
    },
    onError: (error) => {
      const errMessage =
        error instanceof Error ? error.message : "error updating password";
      toast.error(errMessage);
    },
  });
};

export const useUploadImage = (
  onSuccess: () => void,
): UseMutationResult<void, Error, AddOrChangeUserImageType> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddOrChangeUserImageType) => resUser.uploadImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      onSuccess();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "error uploading image",
      );
    },
  });
};

export const useUpdateUserProfile = (
  onSuccess: () => void,
): UseMutationResult<void, Error, UpdateUserType> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => resUser.updateUserprofile(data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
    },
  });
};
