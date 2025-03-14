import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import SpinnerMini from "../../../components/SpinnerMini";
import useAddBookToBookshelf from "../../bookshelf/hooks/useAddBookToBookshelf";
import useUpdateBookshelf from "../../bookshelf/hooks/useUpdateBookshelf";
import useDeleteBookFromBookshelf from "../../bookshelf/hooks/useDeleteBookFromBookshelf";
import { getStatusInVietnamese } from "../../../utils/statusUtils";
import useClickOutsideAndEsc from "../../../hooks/useClickOutsideAndEsc";
import useUser from "../../authentication/hooks/useUser";

export default function BookAction({ book }) {
  const navigate = useNavigate();

  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("want-to-read");
  const dropdownRef = useRef(null);

  const { user, isAuthenticated } = useUser();

  const { addBookToBookshelf, isAddingBook, isBookAdded } =
    useAddBookToBookshelf();

  const { updateBookshelf, isUpdatingBook, isUpdatedBook } =
    useUpdateBookshelf();

  const { deleteBookFromBookshelf, isDeletingBook, isDeletedBook } =
    useDeleteBookFromBookshelf();

  useEffect(() => {
    if (book.status) setSelectedStatus(book.status);
  }, [book]);

  useClickOutsideAndEsc(dropdownRef, setIsDropdown);

  const isLoading = isAddingBook || isUpdatingBook || isDeletingBook;
  const isSuccess = isBookAdded || isUpdatedBook || isDeletedBook;

  function checkAuthAndNavigate() {
    if (!isAuthenticated) {
      navigate("/login");
      return true;
    }

    return false;
  }

  function createBookToAdd(status) {
    return {
      user_id: user && user.id,
      bookId: book.bookId,
      thumbnail: book.thumbnail,
      authors: book.authors,
      title: book.title,
      status,
    };
  }

  function handleAddOrUpdateBookToBookshelf(status) {
    if (checkAuthAndNavigate()) return;

    const bookToAdd = createBookToAdd(status);

    book.status
      ? updateBookshelf({ book: bookToAdd, bookId: book.bookId })
      : addBookToBookshelf(bookToAdd);

    setSelectedStatus(status);
    setIsDropdown(false);
  }

  function handleDeleteBookFromBookshelf() {
    deleteBookFromBookshelf(book.bookId);
    setSelectedStatus("want-to-read");
    setIsDropdown(false);
  }

  function getRemainingStatus() {
    return ["want-to-read", "reading", "read"].filter(
      (status) => status !== selectedStatus,
    );
  }

  function StatusDisplay() {
    return (
      <div className="flex h-10 flex-1 items-center text-center text-lg">
        <div className="flex-1">
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <>
              <span className="pr-2 text-green-600">&#10003;</span>{" "}
              {getStatusInVietnamese(selectedStatus)}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex w-full justify-between overflow-hidden rounded-md border border-gray-300 font-semibold">
        {book.status ? (
          <StatusDisplay />
        ) : (
          <button
            disabled={isLoading}
            onClick={() => handleAddOrUpdateBookToBookshelf(selectedStatus)}
            className="h-10 flex-1 bg-gray-600 text-center text-lg text-white"
          >
            {isLoading ? (
              <SpinnerMini />
            ) : (
              getStatusInVietnamese(selectedStatus)
            )}
          </button>
        )}
        <span
          onClick={() => setIsDropdown((prev) => !prev)}
          className="flex w-10 cursor-pointer items-center justify-center border-l bg-gray-600 text-white"
        >
          &#11206;
        </span>
      </div>

      {isDropdown && (
        <div className="absolute z-10 flex w-full flex-col rounded-md border border-gray-500 bg-gray-100">
          {book.status && (
            <button
              onClick={handleDeleteBookFromBookshelf}
              className="px-4 py-2 text-start font-bold text-red-500"
            >
              {" "}
              Xoá khỏi tủ sách{" "}
            </button>
          )}
          {getRemainingStatus().map((status) => (
            <button
              key={status}
              onClick={() => handleAddOrUpdateBookToBookshelf(status)}
              className="px-4 py-2 text-start"
            >
              {" "}
              {getStatusInVietnamese(status)}{" "}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
