import { Link } from "react-router-dom";

import SlideItems from "../../../components/SlideItems";
import BookCover from "./BookCover";
import SectionHeaderTitle from "../../../components/SectionHeaderTitle";

const SHOW_BOOKS = 8;

export default function BooksCarouselSection({ books, title, href }) {
  const booksToShow = books?.slice(0, SHOW_BOOKS);

  return (
    <section className="mb-10">
      <SectionHeaderTitle title={title} href={href} />

      {books && books.length > 0 ? (
        <SlideItems
          items={booksToShow}
          renderItem={(book) => (
            <Link
              key={book.bookId}
              to={`/book/${book.bookId}`}
              className="inline-block"
            >
              <BookCover book={book} />
            </Link>
          )}
        />
      ) : (
        <p>Không có sách</p>
      )}
    </section>
  );
}
