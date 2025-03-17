import { queryOptions } from "@tanstack/react-query";

import { getBooks } from "../services/apiBooks";

export default function createQueryBooksOptions(
  searchQuery,
  searchType,
  pageToUse,
) {
  const trimmedQuery = searchQuery.trim();

  return queryOptions({
    queryKey: searchQuery
      ? ["books", searchQuery, searchType, pageToUse]
      : ["books"],
    queryFn: () => getBooks(searchQuery, searchType, pageToUse),
    enabled: !!trimmedQuery,
    retry: false,
  });
}
