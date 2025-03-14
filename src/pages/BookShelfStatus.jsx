import { useParams } from "react-router-dom";

import { checkValidStatus, getStatusInVietnamese } from "../utils/statusUtils";
import BookList from "../features/books/components/BookList";
import useBookshelfByStatus from "../features/bookshelf/hooks/useBookshelfByStatus";
import Container from "../components/Container";
import ContentHead from "../components/ContentHead";
import ContentBody from "../components/ContentBody";
import SpinnerLoading from "../components/SpinnerLoading";
import PageNotFound from "./PageNotFound";

export default function BookShelfStatus() {
  const { readStatus } = useParams();

  const {
    data: bookshelf,
    count,
    isLoading,
    isSuccess,
    hasNextPage,
  } = useBookshelfByStatus(readStatus);

  const isValidStatus = checkValidStatus(readStatus);

  if (!isValidStatus) return <PageNotFound />;

  if (isLoading || !isSuccess) return <SpinnerLoading />;

  return (
    <Container>
      <ContentHead
        title={`Sách ${getStatusInVietnamese(readStatus)} (${count})`}
      />

      <ContentBody>
        {count > 0 && bookshelf.length > 0 ? (
          <BookList books={bookshelf} hasNextPage={hasNextPage} />
        ) : (
          <p>Bạn chưa có sách trong kệ sách này.</p>
        )}
      </ContentBody>
    </Container>
  );
}
