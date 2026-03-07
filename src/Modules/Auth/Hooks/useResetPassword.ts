import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { resetPasswordValidationType } from "../Validations/Password";
import { resAuth } from "../Repo/resAuth";

export const useResetPassword = (
  onSuccess: () => void,
  onError: () => void
): UseMutationResult<void, Error, resetPasswordValidationType> => {
  return useMutation({
    mutationFn: (data: resetPasswordValidationType) =>
      resAuth.resetPassword(data),
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      onError();
      console.error("the error is : ", error);
    },
  });
};
