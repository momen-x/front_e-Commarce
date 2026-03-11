import {
  useQueryClient,
  useMutation,
  type UseMutationResult,
} from "@tanstack/react-query";
import { resAuth } from "../Repo/resAuth";
import { toast } from "react-toastify";

export const useLogoutUser = (
  onSuccess: () => void,
): UseMutationResult<void, Error> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resAuth.logOut(),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "error logging out");
      console.error("the error is : ", error);
    },
  });
};
