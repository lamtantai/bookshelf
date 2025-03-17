import { useQuery } from "@tanstack/react-query";

import { getBookDetail } from "../../../services/apiBooks";
import useBookWithStatus from "./useBookWithStatus";

export default function useBookDetail(bookId) {
  const {
    data: bookDetail,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["bookDetail", bookId],
    queryFn: () => getBookDetail(bookId),
    retry: false,
  });

  const bookWithStatus = useBookWithStatus(bookDetail);

  return {
    bookDetail: bookWithStatus,
    isError,
    isSuccess,
    isLoading,
  };
}
