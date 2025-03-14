import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function NavBar({ className }) {
  return (
    <nav
      className={twMerge("flex border-t py-2 text-center md:hidden", className)}
    >
      <Link to="/bookshelf" className="flex-1">
        Tủ sách của tôi
      </Link>

      <Link to="/genres" className="flex-1">
        Các thể loại sách
      </Link>
    </nav>
  );
}
