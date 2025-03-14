import { useParams } from "react-router-dom";

import Container from "../components/Container";
import useBookDetail from "../features/books/hooks/useBookDetail";
import useBooks from "../features/books/hooks/useBooks";
import BookList from "../features/books/components/BookList";

import PageNotFound from "../pages/PageNotFound";
import ContentHead from "../components/ContentHead";
import ContentBody from "../components/ContentBody";
import SpinnerLoading from "../components/SpinnerLoading";

export default function SimilarBook() {
  const { bookId } = useParams();

  const { bookDetail, isLoading, isError } = useBookDetail(bookId);

  const {
    allBooks: allRelatedBooks,
    isLoading: relatedBooksLoading,
    isError: relatedBooksError,
    hasNextPage,
  } = useBooks(bookDetail?.categories[0], "subject");

  console.log(isError, relatedBooksError);

  if (allRelatedBooks?.length === 0 || relatedBooksError)
    return <ContentHead title="Không có kết quả" />;

  if (isLoading || relatedBooksLoading) return <SpinnerLoading />;

  if (isError) return <PageNotFound />;

  return (
    <Container>
      <ContentHead title="Có thể bạn cũng quan tâm" />

      <ContentBody>
        <BookList
          books={allRelatedBooks?.filter(
            (book) => book.bookId !== bookDetail.bookId,
          )}
          hasNextPage={hasNextPage}
        />
      </ContentBody>
    </Container>
  );
}
