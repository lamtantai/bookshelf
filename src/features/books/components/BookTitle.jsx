import { Fragment } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function BookTitle({ book, className }) {
  return (
    <div className={twMerge("overflow-hidden text-sm", className)}>
      <Link
        to={`/book/${book.bookId}`}
        className="block truncate font-bold leading-tight hover:text-blue-400"
      >
        {book.title}
      </Link>

      {book.authors && book.authors.length > 0 && (
        <div>
          {book.authors.map((author, index) => (
            <Fragment key={`${author}-${index}`}>
              <Link
                className="text-blue-600 hover:underline"
                to={`/author/${author}`}
                title={`Xem thêm sách của ${author}`}
              >
                {author}
              </Link>
              {index < book.authors.length - 1 && ", "}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
