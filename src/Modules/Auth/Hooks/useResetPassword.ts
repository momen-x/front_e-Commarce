import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { resetPasswordValidationType } from "../Validations/Password";
import { resAuth } from "../Repo/resAuth";
import { toast } from "react-toastify";

export const useResetPassword = (
  onSuccess: () => void,
): UseMutationResult<
  void,
  Error,
  { data: resetPasswordValidationType; id: string; token: string }
> => {
  return useMutation({
    mutationFn: ({ data, id, token }) => resAuth.resetPassword(data, id, token),
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
