import { PiBookOpenTextLight } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function PreviewBookLink({ href }) {
  return (
    <Link
      title="Xem nội dung sách"
      to={href}
      target="blank"
      className="flex items-center gap-2 text-lg text-accent hover:underline"
    >
      <span>
        <PiBookOpenTextLight />
      </span>
      Xem thử sách
    </Link>
  );
}
