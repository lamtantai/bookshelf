import { Link } from "react-router-dom";

import SearchDropdownItem from "./SearchDropdownItem";

export default function SearchDropdown({ books, query, onClear }) {
  return (
    <div className="absolute w-full rounded-md border-2 border-light-gray bg-white">
      {books && books.length > 0 ? (
        <>
          <ul>
            {books.map((result) => (
              <SearchDropdownItem
                key={result.bookId}
                book={result}
                onClear={onClear}
              />
            ))}
          </ul>

          <SeeAllResults query={query} onClear={onClear} />
        </>
      ) : (
        <NoResults query={query} />
      )}
    </div>
  );
}

function NoResults({ query }) {
  return (
    <div className="overflow-hidden p-2 text-center text-light-gray">
      Không có kết quả cho{" "}
      <span className="block truncate">&quot;{query}&quot;</span>
    </div>
  );
}

function SeeAllResults({ query, onClear }) {
  return (
    <div className="overflow-hidden p-2 text-center text-accent">
      <Link
        to={`/search?query=${query}`}
        className="hover:underline"
        onClick={onClear}
      >
        Xem tất cả kết quả của{" "}
        <span className="block truncate">&quot;{query}&quot;</span>
      </Link>
    </div>
  );
}
