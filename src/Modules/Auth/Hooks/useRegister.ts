import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { resAuth } from "../Repo/resAuth";
import type { registerSchemaInputsType } from "../Validations/Register";
import { toast } from "react-toastify";

export const useRegister = (
  onSuccess: () => void,
): UseMutationResult<void, Error, registerSchemaInputsType> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: registerSchemaInputsType) => resAuth.register(data),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "error registering");
      console.error("the error is : ", error);
    },
  });
};
