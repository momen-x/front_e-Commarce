import { useAuthDialog } from "@/Modules/Auth/Context/AuthDialogContext";
import { useGetCurrentUser } from "@/Utils/useGetDataForCurrentUser";

export const useRequireAuth = () => {
  const { openAuthDialog } = useAuthDialog();
  const { data: user } = useGetCurrentUser();

  const requireAuth = (message: string, onSuccess: () => void) => {
    if (!user) {
      openAuthDialog(message);
      return;
    }
    onSuccess(); // user is logged in, proceed
  };

  return { requireAuth };
};