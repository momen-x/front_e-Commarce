import {
  useQueryClient,
  useMutation,
  type UseMutationResult,
} from "@tanstack/react-query";
import { resAuth } from "../Repo/resAuth";

export const useLogoutUser = (
  onSuccess: () => void
): UseMutationResult<void, Error> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resAuth.logOut(),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("the error is : ", error);
    },
  });
};
