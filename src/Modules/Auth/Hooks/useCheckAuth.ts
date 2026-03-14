import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";

export const useCheckAuth = () => {
  const { data: user, isLoading, isError } = useGetCurrentUser();

  const isAuthenticated = !isLoading && !isError && user;

  return {
    user,
    isAuthenticated,
    isLoading,
  };
};
