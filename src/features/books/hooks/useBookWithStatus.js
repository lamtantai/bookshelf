import { useMemo } from "react";

import useBookshelf from "../../bookshelf/hooks/useBookshelf";

export default function useBookWithStatus(books) {
  const { bookshelf } = useBookshelf();

  const bookshelfMap = useMemo(
    () => new Map(bookshelf?.map((book) => [book.bookId, book.status])),
    [bookshelf],
  );

  return useMemo(() => {
    if (!books || (typeof books !== "object" && !Array.isArray(books))) {
      return books;
    }

    if (Array.isArray(books)) {
      return books.map((book) => ({
        ...book,
        status: bookshelfMap.get(book.bookId) || null,
      }));
    }

    return { ...books, status: bookshelfMap.get(books.bookId) || null };
  }, [books, bookshelfMap]);
}
