import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../../services/apiAuthentication";

export default function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const isAuthenticated = useMemo(() => {
    return user?.role === "authenticated";
  }, [user]);

  return { user, isLoading, isAuthenticated };
}
