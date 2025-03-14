import { queryOptions } from "@tanstack/react-query";

import { getBooks } from "../services/apiBooks";

export default function createQueryBooksOptions(
  searchQuery,
  searchType,
  pageToUse,
  orderByNewest,
) {
  return queryOptions({
    queryKey: searchQuery
      ? [
          "books",
          searchQuery,
          searchType,
          pageToUse,
          orderByNewest ? "orderByNewest" : "orderByDefault",
        ]
      : ["books"],
    queryFn: () => getBooks(searchQuery, searchType, pageToUse, orderByNewest),
    enabled: !!searchQuery,
    retry: false,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
