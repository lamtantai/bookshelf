import { useSearchParams } from "react-router-dom";

import useBooks from "../features/books/hooks/useBooks";

import BookList from "../features/books/components/BookList";
import Container from "../components/Container";
import ContentBody from "../components/ContentBody";
import ContentHead from "../components/ContentHead";
import SpinnerLoading from "../components/SpinnerLoading";

export default function Search() {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("query");

  const { allBooks, isLoading, hasNextPage } = useBooks(searchQuery, "title");

  if (isLoading) return <SpinnerLoading />;

  if (!allBooks && !isLoading)
    return <ContentHead title={`Không có kết quả cho "${searchQuery}"`} />;

  return (
    <Container>
      <ContentHead title={`Kết quả cho "${searchQuery}"`} />

      <ContentBody>
        <BookList books={allBooks} hasNextPage={hasNextPage} />
      </ContentBody>
    </Container>
  );
}
