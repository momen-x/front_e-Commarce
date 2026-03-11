import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import type { loginValidationType } from "../Validations/Login";
import { resAuth } from "../Repo/resAuth";
import { toast } from "react-toastify";

export const useLogin = (
  onSuccess: () => void,
): UseMutationResult<void, Error, loginValidationType> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: loginValidationType) => resAuth.login(data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["last-order"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "error logging in");
      console.error("the error is : ", error);
    },
  });
};
