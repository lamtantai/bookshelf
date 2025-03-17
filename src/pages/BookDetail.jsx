import { useParams } from "react-router-dom";

import PageNotFound from "../pages/PageNotFound";
import Container from "../components/Container";
import useBookDetail from "../features/books/hooks/useBookDetail";
import BookCover from "../features/books/components/BookCover";
import BooksCarouselSection from "../features/books/components/BooksCarouselSection";
import useBooks from "../features/books/hooks/useBooks";
import ContentBody from "../components/ContentBody";
import PreviewBookLink from "../components/PreviewBookLink";
import BookInfo from "../features/books/components/BookInfo";
import BookAction from "../features/books/components/BookAction";
import SpinnerLoading from "../components/SpinnerLoading";
import SpinnerMini from "../components/SpinnerMini";

export default function BookDetail() {
  const { bookId } = useParams();

  const { bookDetail, isLoading, isError } = useBookDetail(bookId);

  const category = bookDetail?.categories?.[0] || "";
  const author = bookDetail?.authors?.[0] || "";

  const { allBooks: allRelatedBooks, isLoading: relatedBooksLoading } =
    useBooks(category || "", "subject", 1);

  const { allBooks: allBooksByAuthor, isLoading: booksByAuthorLoading } =
    useBooks(author || "", "author", 1);

  const filteredRelatedBooks =
    allRelatedBooks?.filter((book) => book.bookId !== bookId) || [];
  const filteredBooksByAuthor =
    allBooksByAuthor?.filter((book) => book.bookId !== bookId) || [];

  if (isLoading) return <SpinnerLoading />;
  if (isError || !bookDetail) return <PageNotFound />;

  return (
    <Container>
      <ContentBody>
        <div className="relative my-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex flex-col items-center gap-3">
            <BookCover book={bookDetail} className="w-36 lg:w-52" />
            <PreviewBookLink href={bookDetail.previewLink} />
            <BookAction book={bookDetail} />
          </div>
          <BookInfo bookDetail={bookDetail} />
        </div>

        {relatedBooksLoading ? (
          <SpinnerMini />
        ) : (
          filteredRelatedBooks.length > 0 && (
            <BooksCarouselSection
              books={filteredRelatedBooks}
              title="Có thể bạn sẽ thích"
              href={`/book/similar/${bookDetail.bookId}`}
            />
          )
        )}

        {booksByAuthorLoading ? (
          <SpinnerMini />
        ) : (
          filteredBooksByAuthor.length > 0 && (
            <BooksCarouselSection
              books={filteredBooksByAuthor}
              title={`Sách khác của ${bookDetail.authors[0]}`}
              href={`/author/${bookDetail.authors[0]}`}
            />
          )
        )}
      </ContentBody>
    </Container>
  );
}
