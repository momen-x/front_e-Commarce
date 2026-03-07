import { useGetUserById } from "@/Modules/profile/Hooks/useUser";
import type { UserData } from "@/Modules/profile/Repo/User";

export const useGetCurrentUser = (): {
  data: UserData | undefined;
  isLoading: boolean;
} => {
  const userId: string | null = localStorage.getItem("userId");
  const { data, isLoading, error } = useGetUserById(userId || "");

  return {
    data: userId && !error ? data : undefined,
    isLoading: userId ? isLoading : false,
  };
};
