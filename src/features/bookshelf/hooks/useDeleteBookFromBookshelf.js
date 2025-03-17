import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookFromBookShelf as deleteBookFromBookShelfAPI } from "../../../services/apiBookshelf";

export default function useDeleteBookFromBookshelf() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteBookFromBookshelf,
    isPending: isDeletingBook,
    isSuccess: isDeletedBook,
  } = useMutation({
    mutationFn: deleteBookFromBookShelfAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookshelf"] });
    },
  });

  return { deleteBookFromBookshelf, isDeletingBook, isDeletedBook };
}
