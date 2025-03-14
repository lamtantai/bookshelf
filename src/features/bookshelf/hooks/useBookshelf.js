import { useQuery } from "@tanstack/react-query";

import { getBookshelf } from "../../../services/apiBookshelf";
import useUser from "../../authentication/hooks/useUser";

export default function useBookshelf() {
  const { isAuthenticated } = useUser();

  const {
    data: bookshelf,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["bookshelf"],
    queryFn: getBookshelf,
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15,
  });

  return { bookshelf, isLoading, isSuccess };
}
