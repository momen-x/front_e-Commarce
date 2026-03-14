import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";


export const useProtectedUnLoggedPage = () => {
  const navigate = useNavigate();
  const { isLoading, isError } = useGetCurrentUser();
  useEffect(() => {
    if (!isLoading && isError) {
      navigate({ to: "/login" });
    }
  }, [isLoading]);};