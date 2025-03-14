import getLanguageName from "../../../utils/getLanguageName";
import getPublishedYear from "../../../utils/getPublishedYear";

export default function EditionDetail({ book }) {
  const publishedYear = getPublishedYear(book.publishedDate);
  const languageName = getLanguageName(book.language);

  return (
    <div>
      <div className="flex">
        <span className="w-44 flex-shrink-0">Tổng số trang</span>
        <span className="font-medium">{book.pageCount} trang</span>
      </div>

      <div className="flex">
        <span className="w-44 flex-shrink-0">Nhà xuất bản</span>
        <span className="font-medium">{book.publisher ?? "N/A"}</span>
      </div>

      <div className="flex">
        <span className="w-44 flex-shrink-0">Năm xuất bản</span>
        <span className="font-medium">{publishedYear}</span>
      </div>

      <div className="flex">
        <span className="w-44 flex-shrink-0">Ngôn ngữ</span>
        <span className="font-medium">{languageName}</span>
      </div>
    </div>
  );
}
