import TruncatedContent from "../../../components/TruncatedContent";
import BookAuthor from "./BookAuthor";
import EditionDetail from "./EditionDetail";

export default function BookInfo({ bookDetail }) {
  return (
    <div className="space-y-8 overflow-hidden">
      <div className="text-center lg:text-start">
        <h1 className="mb-2 text-2xl/none font-medium">{bookDetail.title}</h1>
        <BookAuthor book={bookDetail} />
      </div>

      {bookDetail.description && (
        <div className="mt-10">
          <h3 className="mb-4 text-xl font-medium">Tóm tắt sách</h3>

          <TruncatedContent>
            <p
              dangerouslySetInnerHTML={{ __html: bookDetail.description }}
              className="synopsistext"
            />
          </TruncatedContent>
        </div>
      )}

      <EditionDetail book={bookDetail} />
    </div>
  );
}
