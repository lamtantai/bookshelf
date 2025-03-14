import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import createQueryBooksOptions from "../../../queryOptions/createQueryBooksOptions";
import useCurrentPage from "../../../hooks/useCurrentPage";

export default function useBooks(
  searchQuery,
  searchType,
  page,
  orderByNewest = false,
) {
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
  } = useQuery(
    createQueryBooksOptions(searchQuery, searchType, pageToUse, orderByNewest),
  );

  useEffect(() => {
    async function prefetchAndCheck() {
      try {
        const { allBooks } = await queryClient.fetchQuery(
          createQueryBooksOptions(
            searchQuery,
            searchType,
            pageToUse + 1,
            orderByNewest,
          ),
        );
        if (allBooks.length === 0) setHasNextPage(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (isSuccess) {
      prefetchAndCheck();
    }
  }, [
    queryClient,
    searchQuery,
    searchType,
    pageToUse,
    orderByNewest,
    isSuccess,
  ]);

  return {
    allBooks,
    totalItems,
    isError,
    isLoading,
    currentPage,
    isPending,
    isSuccess,
    error,
    hasNextPage,
  };
}
