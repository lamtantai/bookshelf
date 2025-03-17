import { useQuery } from "@tanstack/react-query";

import { getBookshelfByStatus } from "../../../services/apiBookshelf";
import useUser from "../../authentication/hooks/useUser";
import useCurrentPage from "../../../hooks/useCurrentPage";
import { PAGE_SIZE } from "../../../utils/constants";

export default function useBookshelfByStatus(status) {
  const { isAuthenticated } = useUser();
  const currentPage = useCurrentPage();

  const {
    data: { data, count } = {},
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["bookshelf", currentPage, status],
    queryFn: () => getBookshelfByStatus(currentPage, status),
    enabled: isAuthenticated,
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const hasNextPage = currentPage < pageCount;

  return { data, count, pageCount, isLoading, isSuccess, hasNextPage };
}
