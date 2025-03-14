import { useNavigate } from "react-router-dom";
import { useState, useRef, useMemo, useCallback } from "react";

import SpinnerMini from "../../../components/SpinnerMini";
import useAddBookToBookshelf from "../../bookshelf/hooks/useAddBookToBookshelf";
import useUpdateBookshelf from "../../bookshelf/hooks/useUpdateBookshelf";
import useDeleteBookFromBookshelf from "../../bookshelf/hooks/useDeleteBookFromBookshelf";
import { getStatusInVietnamese } from "../../../utils/statusUtils";
import useClickOutsideAndEsc from "../../../hooks/useClickOutsideAndEsc";
import useUser from "../../authentication/hooks/useUser";
import useBookshelf from "../../bookshelf/hooks/useBookshelf";

export default function BookAction({ book }) {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("want-to-read");

  const { user, isAuthenticated } = useUser();
  const { bookshelf, isLoading: isBookshelfLoading } = useBookshelf();
  const { addBookToBookshelf, isAddingBook, isBookAdded } =
    useAddBookToBookshelf();
  const { updateBookshelf, isUpdatingBook, isUpdatedBook } =
    useUpdateBookshelf();
  const { deleteBookFromBookshelf, isDeletingBook, isDeletedBook } =
    useDeleteBookFromBookshelf();

  const isBookInBookshelf = useMemo(() => {
    return bookshelf?.find(
      (bookInBookshelf) => bookInBookshelf.bookId === book.bookId,
    );
  }, [bookshelf, book]);

  useClickOutsideAndEsc(dropdownRef, setIsDropdown);

  const isLoading = isAddingBook || isUpdatingBook || isDeletingBook;
  const isSuccess = isBookAdded || isUpdatedBook || isDeletedBook;

  const checkAuthAndNavigate = useCallback(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return true;
    }
    return false;
  }, [isAuthenticated, navigate]);

  const createBookToAdd = useCallback(
    (status) => {
      return {
        user_id: user && user.id,
        bookId: book.bookId,
        thumbnail: book.thumbnail,
        authors: book.authors,
        title: book.title,
        status,
      };
    },
    [user, book],
  );

  const handleAddOrUpdateBookToBookshelf = useCallback(
    (status) => {
      if (checkAuthAndNavigate()) return;

      const bookToAdd = createBookToAdd(status);

      book.status
        ? updateBookshelf({ book: bookToAdd, bookId: book.bookId })
        : addBookToBookshelf(bookToAdd);

      setSelectedStatus(status);
      setIsDropdown(false);
    },
    [
      checkAuthAndNavigate,
      createBookToAdd,
      updateBookshelf,
      addBookToBookshelf,
      book.status,
      book.bookId,
    ],
  );

  const handleDeleteBookFromBookshelf = useCallback(() => {
    deleteBookFromBookshelf(book.bookId);
    setIsDropdown(false);
    setSelectedStatus("want-to-read");
  }, [deleteBookFromBookshelf, book.bookId]);

  const getRemainingStatus = useCallback(() => {
    return ["want-to-read", "reading", "read"].filter(
      (status) => status !== selectedStatus,
    );
  }, [selectedStatus]);

  function DisplayStatus() {
    return (
      <div className="flex w-full justify-between overflow-hidden rounded-md border border-gray-300 font-semibold">
        <button
          disabled={
            isLoading || isBookInBookshelf || isBookshelfLoading || !isSuccess
          }
          onClick={() => handleAddOrUpdateBookToBookshelf(selectedStatus)}
          className={`h-10 flex-1 text-center text-lg ${isBookInBookshelf || isLoading ? "pointer-events-none" : "bg-gray-600 text-white"}`}
        >
          {isLoading ? <SpinnerMini /> : getStatusInVietnamese(selectedStatus)}
        </button>

        <span
          onClick={() => setIsDropdown((prev) => !prev)}
          className="flex w-10 cursor-pointer items-center justify-center border-l bg-gray-600 text-white"
        >
          &#11206;
        </span>
      </div>
    );
  }

  if (isBookshelfLoading) return;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <DisplayStatus />

      {isDropdown && (
        <div className="absolute z-10 flex w-full flex-col rounded-md border border-gray-500 bg-gray-100">
          {isBookInBookshelf?.status && (
            <button
              onClick={handleDeleteBookFromBookshelf}
              className="px-4 py-2 text-start font-bold text-red-500"
            >
              Xoá khỏi tủ sách
            </button>
          )}

          {getRemainingStatus().map((status) => (
            <button
              key={status}
              onClick={() => handleAddOrUpdateBookToBookshelf(status)}
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
