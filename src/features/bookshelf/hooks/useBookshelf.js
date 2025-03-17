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
  });

  return { bookshelf, isLoading, isSuccess };
}
