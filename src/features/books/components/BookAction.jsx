import { useNavigate } from "react-router-dom";
import { useState, useRef, useMemo } from "react";

import SpinnerMini from "../../../components/SpinnerMini";
import useAddBookToBookshelf from "../../bookshelf/hooks/useAddBookToBookshelf";
import useUpdateBookshelf from "../../bookshelf/hooks/useUpdateBookshelf";
import useDeleteBookFromBookshelf from "../../bookshelf/hooks/useDeleteBookFromBookshelf";
import { getStatusInVietnamese } from "../../../utils/statusUtils";
import useClickOutsideAndEsc from "../../../hooks/useClickOutsideAndEsc";
import useUser from "../../authentication/hooks/useUser";

export default function BookAction({ book }) {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isDropdown, setIsDropdown] = useState(false);

  const { user, isAuthenticated } = useUser();
  const { addBookToBookshelf, isAddingBook } = useAddBookToBookshelf();
  const { updateBookshelf, isUpdatingBook } = useUpdateBookshelf();
  const { deleteBookFromBookshelf, isDeletingBook } =
    useDeleteBookFromBookshelf();

  const isLoading = isAddingBook || isUpdatingBook || isDeletingBook;
  const isBookInBookshelf = isAuthenticated && !!book.status;
  const selectedStatus = book.status || "want-to-read";

  useClickOutsideAndEsc(dropdownRef, setIsDropdown);

  const checkAuthAndNavigate = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return true;
    }
    return false;
  };

  const createBookPayload = (status) => ({
    user_id: user?.id,
    bookId: book.bookId,
    thumbnail: book.thumbnail,
    authors: book.authors,
    title: book.title,
    status,
  });

  const handleStatusChange = (status) => {
    if (checkAuthAndNavigate()) return;

    const bookPayload = createBookPayload(status);

    isBookInBookshelf
      ? updateBookshelf({ book: bookPayload, bookId: book.bookId })
      : addBookToBookshelf(bookPayload);

    setIsDropdown(false);
  };

  const handleDeleteBook = () => {
    deleteBookFromBookshelf(book.bookId);
    setIsDropdown(false);
  };

  const remainingStatuses = useMemo(
    () =>
      ["want-to-read", "reading", "read"].filter(
        (status) => status !== selectedStatus,
      ),
    [selectedStatus],
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <DisplayStatus
        isLoading={isLoading}
        isBookInBookshelf={isBookInBookshelf}
        selectedStatus={selectedStatus}
        onClick={() => handleStatusChange(selectedStatus)}
        onToggleDropdown={() => setIsDropdown((prev) => !prev)}
      />

      {isDropdown && (
        <div className="absolute z-10 flex w-full flex-col rounded-md border border-gray-500 bg-gray-100">
          {isBookInBookshelf && (
            <button
              onClick={handleDeleteBook}
              className="px-4 py-2 text-start font-bold text-red-500"
            >
              Xoá khỏi tủ sách
            </button>
          )}
          {remainingStatuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className="px-4 py-2 text-start"
            >
              {getStatusInVietnamese(status)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DisplayStatus({
  isLoading,
  isBookInBookshelf,
  selectedStatus,
  onClick,
  onToggleDropdown,
}) {
  return (
    <div className="flex w-full justify-between overflow-hidden rounded-md border border-gray-300 font-semibold">
      <button
        disabled={isLoading || isBookInBookshelf}
        onClick={onClick}
        className={`h-10 flex-1 text-center text-lg ${
          isBookInBookshelf || isLoading
            ? "pointer-events-none"
            : "bg-gray-600 text-white"
        }`}
      >
        {isLoading ? <SpinnerMini /> : getStatusInVietnamese(selectedStatus)}
      </button>
      <span
        onClick={onToggleDropdown}
        className="flex w-10 cursor-pointer items-center justify-center border-l bg-gray-600 text-white"
      >
        &#11206;
      </span>
    </div>
  );
}
