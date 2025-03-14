import Pagination from "../../../components/Pagination";
import BookItem from "./BookItem";

export default function BookList({ books, hasNextPage }) {
  return (
    <section>
      <div className="mb-4 flex flex-col gap-4">
        {books?.map((book) => (
          <BookItem book={book} key={book.bookId} />
        ))}
      </div>

      <Pagination hasNextPage={hasNextPage} />
    </section>
  );
}
