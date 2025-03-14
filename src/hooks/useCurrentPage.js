import { useSearchParams } from "react-router-dom";

export default function useCurrentPage() {
  const [searchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Math.max(Number(searchParams.get("page")), 1);

  return currentPage;
}
