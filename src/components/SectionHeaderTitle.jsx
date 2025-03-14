import { Link } from "react-router-dom";

export default function SectionHeaderTitle({ title, href }) {
  return (
    <div className="mb-2 flex items-end justify-between font-bold">
      <h3 className="text-xl capitalize lg:text-2xl">{title}</h3>

      <Link
        to={href}
        className="flex-shrink-0 text-sm text-blue-600 hover:underline"
      >
        Xem tất cả
      </Link>
    </div>
  );
}
