import { useSearchParams } from "react-router-dom";

export default function Pagination({ hasNextPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page")
    ? Math.max(Number(searchParams.get("page")), 1)
    : 1;

  function handleChangePage(page) {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <PageButton
        disabled={currentPage === 1}
        direction="prev"
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />

      <PageButton
        disabled={!hasNextPage}
        direction="next"
        handleChangePage={handleChangePage}
        currentPage={currentPage}
      />
    </div>
  );
}

function PageButton({ direction, currentPage, handleChangePage, disabled }) {
  const isPrev = direction === "prev";
  const buttonText = isPrev ? "Sau" : "Trước";
  const ariaLabel = isPrev ? "Quay lại trang trước" : "Tới trang kế tiếp";

  return (
    <button
      disabled={disabled}
      className={`p-2 text-sm text-accent hover:bg-accent hover:text-white ${disabled ? "pointer-events-none opacity-50" : ""}`}
      onClick={() =>
        handleChangePage(isPrev ? currentPage - 1 : currentPage + 1)
      }
      aria-label={ariaLabel}
    >
      {buttonText}
    </button>
  );
}
