import { useParams } from "react-router-dom";

import useBooks from "../features/books/hooks/useBooks";

import Container from "../components/Container";
import BookList from "../features/books/components/BookList";
import ContentHead from "../components/ContentHead";
import ContentBody from "../components/ContentBody";
import SpinnerLoading from "../components/SpinnerLoading";

export default function Author() {
  const { authorName } = useParams();

  const { allBooks, isLoading, totalItems, hasNextPage } = useBooks(
    authorName,
    "author",
  );

  if (!totalItems && !isLoading) {
    return <ContentHead title={`Không có sách của "${authorName}"`} />;
  }

  if (isLoading) return <SpinnerLoading />;

  return (
    <Container>
      <ContentHead title={`Sách của ${authorName}`} />

      <ContentBody>
        <BookList books={allBooks} hasNextPage={hasNextPage} />
      </ContentBody>
    </Container>
  );
}
