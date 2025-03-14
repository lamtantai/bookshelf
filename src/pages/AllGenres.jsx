import { genres } from "../features/books/genresData";
import useBooksByGenres from "../features/books/hooks/useBooksByGenres";

import Container from "../components/Container";
import ContentHead from "../components/ContentHead";
import ContentBody from "../components/ContentBody";
import BooksCarouselSection from "../features/books/components/BooksCarouselSection";
import SpinnerMini from "../components/SpinnerMini";

export default function AllGenres() {
  const genresSlug = genres.map((genre) => genre.slug);
  const booksByGenres = useBooksByGenres(genresSlug);

  return (
    <Container>
      <ContentHead title="Các thể loại sách phổ biến" />

      <ContentBody>
        {booksByGenres.map((books, index) => {
          const { data, isLoading } = books;

          if (isLoading) return <SpinnerMini key={index} />;

          return (
            <BooksCarouselSection
              key={index}
              books={data?.allBooks}
              title={`Sách ${genres[index].displayName}`}
              href={`/genres/${genres[index].slug}`}
            />
          );
        })}
      </ContentBody>
    </Container>
  );
}
