import {
  useMutation,
  type UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useResCart } from "../Repo/resCart";
import type { IOrderToAdd, Order } from "../Repo/Cart";
import { toast } from "react-toastify";

interface UseSaveOrderProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSaveOrder = ({ onSuccess }: UseSaveOrderProps = {}) => {
  const queryClient = useQueryClient();
  const { saveCartOnLogout } = useResCart();

  return useMutation<void, Error, IOrderToAdd>({
    mutationFn: (data: IOrderToAdd) => saveCartOnLogout(data),
    onSuccess: () => {
      // Invalidate queries related to orders to refetch them next time.
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      const axiosError = error as any;
      const backendMessage =
        axiosError.response?.data?.error || axiosError.response?.data?.message;
      // Display the actual error message for a better user experience
      toast.error(
        backendMessage ||
          error.message ||
          "An unexpected error occurred while saving the cart.",
      );
      console.log(error);
    },
  });
};

export const useGetLastOrder = (): {
  data: Order | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { getTheLastOrder } = useResCart();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["last-order"],
    queryFn: () => getTheLastOrder(),
    retry: false,
    staleTime: Infinity, // only refetch when YOU decide
  });
  return {
    data,
    isLoading,
    isError,
  };
};

export const useAddOrder = (
): UseMutationResult<Order, Error, IOrderToAdd> => {
  const { addOrder } = useResCart();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IOrderToAdd) => addOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["last-order"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "error adding order",
      );
      console.error("the error is : ", error);
    },
  });
};
