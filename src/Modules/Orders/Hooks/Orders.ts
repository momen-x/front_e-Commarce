import { resOrders } from "@/Modules/Orders/Repo/resOrders";
import type { IAllOrder, IOrder } from "@/Modules/Orders/Repo/Orders";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";

export const useGetUserOrders = (): {
  data: IOrder[] | [];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError }: UseQueryResult<IOrder[], Error> =
    useQuery({
      queryKey: ["orders"],
      queryFn: () => resOrders.getOrders(),
      retry: false,
      staleTime: Infinity, // only refetch when YOU decide
    });
  return {
    data: data || [],
    isLoading,
    isError,
  };
};

export const useGetAllOrders = (): {
  data: IAllOrder[] | [];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError }: UseQueryResult<IAllOrder[], Error> =
    useQuery({
      queryKey: ["all-orders"],
      queryFn: () => resOrders.getAllOrdersByAdmin(),
      retry: false,
      staleTime: 5 * 60 * 1000,
    });
  return {
    data: data || [],
    isLoading,
    isError,
  };
};
