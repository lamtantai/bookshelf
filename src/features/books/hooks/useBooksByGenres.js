import { useQueries } from "@tanstack/react-query";

import createQueryBooksOptions from "../../../queryOptions/createQueryBooksOptions";

export default function useBooksByGenres(genres) {
  const genreQueries = useQueries({
    queries: genres.map((genre) =>
      createQueryBooksOptions(genre, "subject", 1, false),
    ),
  });

  return genreQueries;
}
