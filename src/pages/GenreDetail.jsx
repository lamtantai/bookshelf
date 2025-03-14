import { useParams } from "react-router-dom";

import {
  checkValidGenre,
  getGenreDisplayName,
} from "../features/books/genresData";
import useBooks from "../features/books/hooks/useBooks";

import Container from "../components/Container";
import BooksCarouselSection from "../features/books/components/BooksCarouselSection";
import GenresList from "../features/books/components/GenresList";
import ContentHead from "../components/ContentHead";
import ContentBody from "../components/ContentBody";
import PageNotFound from "./PageNotFound";
import SpinnerLoading from "../components/SpinnerLoading";

export default function GenreDetail() {
  const { genreSlug } = useParams();

  const isValidGenre = checkValidGenre(genreSlug);

  const { allBooks, isLoading, isError } = useBooks(
    genreSlug,
    "subject",
    1,
    false,
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if ((isError || !isValidGenre) && !isLoading) {
    return <PageNotFound />;
  }

  return (
    <Container>
      <ContentHead title={`Sách ${getGenreDisplayName(genreSlug)}`} />

      <ContentBody>
        <img
          src={`/${genreSlug}-genre-bg.png`}
          alt={` Ảnh các sách ${getGenreDisplayName(genreSlug)}`}
          className="mb-20 h-40 w-full bg-gray-500 object-cover object-top lg:h-80"
        />

        <BooksCarouselSection
          books={allBooks}
          title="Tất cả sách"
          href={`/genres/books/${genreSlug}`}
        />

        <GenresList />
      </ContentBody>
    </Container>
  );
}
