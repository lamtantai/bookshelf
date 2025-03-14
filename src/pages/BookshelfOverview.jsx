import { useMemo } from "react";

import Container from "../components/Container";
import ContentBody from "../components/ContentBody";
import ContentHead from "../components/ContentHead";
import SpinnerLoading from "../components/SpinnerLoading";
import BooksCarouselSection from "../features/books/components/BooksCarouselSection";
import useBookshelf from "../features/bookshelf/hooks/useBookshelf";
import UserHeader from "../features/authentication/components/UserHeader";

export default function BookshelfOverview() {
  const { bookshelf, isLoading, isSuccess } = useBookshelf();

  const { wantToReadBooks, readingBooks, readBooks } = useMemo(() => {
    if (!bookshelf)
      return { wantToReadBooks: [], readingBooks: [], readBooks: [] };

    const wantToRead = [];
    const reading = [];
    const read = [];

    bookshelf.forEach((book) => {
      if (book.status === "want-to-read") wantToRead.push(book);
      else if (book.status === "reading") reading.push(book);
      else if (book.status === "read") read.push(book);
    });

    return {
      wantToReadBooks: wantToRead,
      readingBooks: reading,
      readBooks: read,
    };
  }, [bookshelf]);

  if (isLoading || !isSuccess) return <SpinnerLoading />;

  return (
    <Container>
      <UserHeader />

      <ContentHead title="Tủ sách của tôi" />

      <ContentBody>
        <BooksCarouselSection
          books={wantToReadBooks}
          title={`Sách muốn đọc (${wantToReadBooks.length})`}
          href="want-to-read"
        />

        <BooksCarouselSection
          books={readingBooks}
          title={`Sách đang đọc (${readingBooks.length})`}
          href="reading"
        />

        <BooksCarouselSection
          books={readBooks}
          title={`Sách đã đọc (${readBooks.length})`}
          href="read"
        />
      </ContentBody>
    </Container>
  );
}
