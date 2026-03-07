import { useEffect } from "react";
import { useGetCurrentUser } from "./useGetDataForCurrentUser";
import { useNavigate } from "@tanstack/react-router";

const useProtectedLoggedUserPage = () => {
  const { data, isLoading } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate({ to: "/" });
    }
  }, [data, isLoading, navigate]);
};

export default useProtectedLoggedUserPage;
