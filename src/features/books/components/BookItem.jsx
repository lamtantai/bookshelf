import { Link } from "react-router-dom";

import BookCover from "./BookCover";
import BookAction from "./BookAction";
import BookTitle from "./BookTitle";

export default function BookItem({ book }) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 rounded-md bg-slate-50 p-4 lg:grid-cols-[auto_1fr_200px]">
      <Link to={`/book/${book.bookId}`} className="mx-auto">
        <BookCover book={book} className="w-32" />
      </Link>

      <div className="overflow-hidden">
        <BookTitle book={book} className="text-xl" />
      </div>

      <BookAction book={book} />
    </div>
  );
}
