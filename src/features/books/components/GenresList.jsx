import { NavLink } from "react-router-dom";

import { genres } from "../genresData";

import SlideItems from "../../../components/SlideItems";
import SectionHeaderTitle from "../../../components/SectionHeaderTitle";

export default function GenresList() {
  return (
    <section>
      <SectionHeaderTitle title="Các thể loại sách khác" href="/genres" />

      <div className="border-y border-black py-3">
        <SlideItems
          gap={32}
          items={genres}
          renderItem={(genre) => (
            <NavLink
              key={genre}
              className={({ isActive }) =>
                "flex flex-col items-center gap-3 " +
                (isActive
                  ? "pointer-events-none"
                  : "opacity-50 hover:underline hover:opacity-100")
              }
              to={`/genres/${genre.slug}`}
            >
              <span className="rounded-full bg-sky-200 p-6 text-5xl">
                {genre.icon}
              </span>

              <p className="text-sm font-medium uppercase">
                {genre.displayName}
              </p>
            </NavLink>
          )}
        />
      </div>
    </section>
  );
}
