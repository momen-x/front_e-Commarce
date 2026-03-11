import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import type { forgotPasswordValidationType } from "../Validations/Password";
import { resAuth } from "../Repo/resAuth";
import { toast } from "react-toastify";

export const useForgotPassword = (
  onSuccess: () => void,
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
      toast.error(
        error instanceof Error ? error.message : "error sending email",
      );
      console.error("the error is : ", error);
    },
  });
};
