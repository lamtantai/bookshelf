import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookToBookshelf as addBookToBookshelfAPI } from "../../../services/apiBookshelf";

export default function useAddBookToBookshelf() {
  const queryClient = useQueryClient();

  const {
    mutate: addBookToBookshelf,
    isPending: isAddingBook,
    isSuccess: isBookAdded,
  } = useMutation({
    mutationFn: addBookToBookshelfAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookshelf"] });
    },
  });

  return { addBookToBookshelf, isAddingBook, isBookAdded };
}
