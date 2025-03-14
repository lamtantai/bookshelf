import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookshelf as updateBookshelfAPI } from "../../../services/apiBookshelf";

export default function useUpdateBookshelf() {
  const queryClient = useQueryClient();

  const {
    mutate: updateBookshelf,
    isPending: isUpdatingBook,
    isSuccess: isUpdatedBook,
  } = useMutation({
    mutationFn: ({ book, bookId }) => updateBookshelfAPI({ book, bookId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookshelf"]);
    },
  });

  return { updateBookshelf, isUpdatingBook, isUpdatedBook };
}
