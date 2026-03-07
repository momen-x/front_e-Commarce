import { useEffect } from "react";
import { useGetCurrentUser } from "./useGetDataForCurrentUser";
import { useNavigate } from "@tanstack/react-router";

const useProtectedAuthPages = () => {
  const { data, isLoading } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate({ to: "/" });
    }
  }, [data, isLoading, navigate]);
};

export default useProtectedAuthPages;
