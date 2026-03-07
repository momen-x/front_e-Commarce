import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import type { loginValidationType } from "../Validations/Login";
import { resAuth } from "../Repo/resAuth";

export const useLogin = (
  onSuccess: () => void,
  onError: () => void
): UseMutationResult<void, Error, loginValidationType> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: loginValidationType) => resAuth.login(data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      onError();
      console.error("the error is : ", error);
    },
  });
};
