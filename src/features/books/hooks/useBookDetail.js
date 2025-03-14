import { useQuery } from "@tanstack/react-query";

import { getBookDetail } from "../../../services/apiBooks";

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
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15,
  });

  return {
    bookDetail,
    isError,
    isSuccess,
    isLoading,
  };
}
