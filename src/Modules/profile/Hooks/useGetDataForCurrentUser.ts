import { resUser } from "../Repo/resUser";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: resUser.getLoggedUserData,
    retry: false,
    staleTime: Infinity, // only refetch when YOU decide
  });
};
