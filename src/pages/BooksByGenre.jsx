import { useParams } from "react-router-dom";

import useBooks from "../features/books/hooks/useBooks";
import {
  getGenreDisplayName,
  checkValidGenre,
} from "../features/books/genresData";

import BookList from "../features/books/components/BookList";
import Container from "../components/Container";
import ContentBody from "../components/ContentBody";
import ContentHead from "../components/ContentHead";
import PageNotFound from "./PageNotFound";
import SpinnerLoading from "../components/SpinnerLoading";

export default function BooksByGenre() {
  const { genreSlug } = useParams();

  const isValidGenre = checkValidGenre(genreSlug);

  const { allBooks, hasNextPage, isLoading, isError } = useBooks(
    genreSlug,
    "subject",
  );

  if (allBooks?.length === 0 && !isLoading)
    return (
      <Container>
        <ContentHead title={`Không có kết quả cho "${genreSlug}"`} />
      </Container>
    );

  if (!isValidGenre || isError) {
    return <PageNotFound />;
  }

  if (isLoading) return <SpinnerLoading />;

  return (
    <Container>
      <ContentHead title={`Sách thể loại ${getGenreDisplayName(genreSlug)}`} />

      <ContentBody>
        <BookList books={allBooks} hasNextPage={hasNextPage} />
      </ContentBody>
    </Container>
  );
}
