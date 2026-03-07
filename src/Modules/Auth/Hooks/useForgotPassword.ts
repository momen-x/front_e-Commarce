import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import type { forgotPasswordValidationType } from "../Validations/Password";
import { resAuth } from "../Repo/resAuth";

export const useForgotPassword = (
  onSuccess: () => void,
  onError: () => void
): UseMutationResult<void, Error, forgotPasswordValidationType> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: forgotPasswordValidationType) =>
      resAuth.forgotPassword(data),
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
