import { Link } from "react-router-dom";

import BookCover from "../../books/components/BookCover";

export default function SearchDropdownItem({ book, onClear }) {
  return (
    <li className="border-b hover:bg-slate-100">
      <Link
        to={`/book/${book.bookId}`}
        onClick={onClear}
        className="flex gap-2 p-2"
      >
        <BookCover className="w-10 flex-shrink-0 lg:w-12" book={book} />

        <div className="overflow-hidden">
          <p className="truncate font-medium">{book.title}</p>
          {book.authors && book.authors.length > 0 && (
            <p className="truncate text-sm text-blue-600">{book.authors[0]}</p>
          )}
        </div>
      </Link>
    </li>
  );
}
