import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { resAuth } from "../Repo/resAuth";
import type { registerSchemaInputsType } from "../Validations/Register";

export const useRegister = (
  onSuccess: () => void,
  onError: () => void
): UseMutationResult<void, Error, registerSchemaInputsType> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: registerSchemaInputsType) => resAuth.register(data),
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
