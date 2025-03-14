import { Link } from "react-router-dom";

export default function CTAButton({ href, label }) {
  return (
    <div className="inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
      <Link to={href} className="">
        {label}
      </Link>
    </div>
  );
}
