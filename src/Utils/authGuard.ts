import { queryClient } from "@/main";
import type { UserData } from "@/Modules/profile/Repo/User";

/**
 * Check if user is authenticated by trying to fetch user data from cache.
 * If user data is not in cache, tries to fetch it from the API.
 * Returns the user data if authenticated, or throws an error if not.
 */
export const checkAuthentication = async (): Promise<UserData> => {
  // First, check if user data is already cached
  const cachedData = queryClient.getQueryData<UserData>(["me"]);
  
  if (cachedData) {
    return cachedData;
  }

  // If not cached, try to fetch it
  try {
    const userData = await queryClient.fetchQuery({
      queryKey: ["me"],
      queryFn: async () => {
        const { resUser } = await import("@/Modules/profile/Repo/resUser");
        return resUser.getLoggedUserData();
      },
      staleTime: Infinity,
      retry: false,
    });
    return userData;
  } catch {
    throw new Error("Not authenticated");
  }
};
