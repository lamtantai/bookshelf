import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function BookAuthor({ book }) {
  if (!book.authors || book.authors.length === 0) {
    return null;
  }

  return book.authors.map((author, index) => (
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
  ));
}
