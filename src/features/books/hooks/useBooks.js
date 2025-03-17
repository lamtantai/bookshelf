import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import createQueryBooksOptions from "../../../queryOptions/createQueryBooksOptions";
import useCurrentPage from "../../../hooks/useCurrentPage";
import useBookWithStatus from "./useBookWithStatus";

export default function useBooks(searchQuery, searchType, page) {
  const queryClient = useQueryClient();
  const currentPage = useCurrentPage();

  const [hasNextPage, setHasNextPage] = useState(true);

  let pageToUse = page ?? currentPage;

  const {
    data: { allBooks, totalItems } = {},
    isLoading,
    isError,
    isPending,
    isSuccess,
    error,
  } = useQuery(createQueryBooksOptions(searchQuery, searchType, pageToUse));

  useEffect(() => {
    async function prefetchAndCheck() {
      try {
        const { allBooks } = await queryClient.fetchQuery(
          createQueryBooksOptions(searchQuery, searchType, pageToUse + 1),
        );
        if (allBooks.length === 0) setHasNextPage(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (isSuccess) {
      prefetchAndCheck();
    }
  }, [queryClient, searchQuery, searchType, pageToUse, isSuccess]);

  const booksWithStatus = useBookWithStatus(allBooks);

  return {
    allBooks: booksWithStatus,
    totalItems,
    isError,
    isLoading,
    isPending,
    isSuccess,
    error,
    hasNextPage,
  };
}
