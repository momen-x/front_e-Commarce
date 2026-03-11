import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { resetPasswordValidationType } from "../Validations/Password";
import { resAuth } from "../Repo/resAuth";
import { toast } from "react-toastify";

export const useResetPassword = (
  onSuccess: () => void,
): UseMutationResult<void, Error, resetPasswordValidationType> => {
  return useMutation({
    mutationFn: (data: resetPasswordValidationType) =>
      resAuth.resetPassword(data),
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "error resetting password",
      );
      console.error("the error is : ", error);
    },
  });
};
