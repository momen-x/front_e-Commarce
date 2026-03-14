import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const useProtectedTheAuthPages = () => {
  const { data, isLoading, isError } = useGetCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && data && !isError) {
      navigate({ to: "/" });
    }
  }, [isLoading, isError, data]);
};

export default useProtectedTheAuthPages;
