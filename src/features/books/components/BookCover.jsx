import { twMerge } from "tailwind-merge";

export default function BookCover({ book, className }) {
  return (
    <div className={twMerge("w-28 lg:w-40", className)}>
      <img
        src={book.thumbnail ?? "/no-cover-thumb.png"}
        alt={book.title}
        loading="lazy"
        className="aspect-[1/1.5] w-full bg-gray-400 object-cover"
      />
    </div>
  );
}
