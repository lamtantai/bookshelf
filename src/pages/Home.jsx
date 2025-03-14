import { Link } from "react-router-dom";

import { genres } from "../features/books/genresData";

import Container from "../components/Container";
import ContentBody from "../components/ContentBody";
import CTAButton from "../components/CTAButton";

export default function Home() {
  return (
    <>
      <HeroSection />

      <Container>
        <ContentBody>
          <IntroSection />

          <h2 className="mb-4 text-3xl font-bold">Các thể loại sách</h2>

          {genres.slice(0, 3).map((genre) => (
            <GenreIllustration key={genre.slug} genre={genre} />
          ))}

          <div className="mt-6 text-center">
            <CTAButton label="Khám phá tất cả" href="/genres" />
          </div>
        </ContentBody>
      </Container>
    </>
  );
}

function HeroSection() {
  return (
    <section className="grid grid-cols-1 grid-rows-1 bg-accent lg:grid-cols-2">
      <div className="z-10 col-start-1 row-start-1 mx-auto max-w-screen-sm place-self-center px-horizontal text-white">
        <h1 className="mb-3 text-5xl font-black lg:text-7xl">Bookshelf</h1>

        <p className="text-balance text-3xl font-medium tracking-tight lg:text-4xl">
          Mỗi cuốn sách là một cánh cửa mở ra thế giới vô tận.
        </p>
      </div>

      <img
        src="/hero-image.png"
        alt=""
        className="col-start-1 row-start-1 h-[500px] w-full object-cover object-left opacity-10 lg:col-start-2 lg:h-[666px] lg:opacity-80"
      />
    </section>
  );
}

function IntroSection() {
  return (
    <section className="mx-auto my-20 text-center">
      <h2 className="mb-5 text-3xl font-bold lg:text-4xl">
        Bạn đang cảm thấy bối rối không biết chọn sách gì?
      </h2>

      <p className="text-light-black">
        Bạn đã đến đúng nơi rồi đấy. Chúng tôi mang đến bộ sưu tập sách đa dạng,
        từ tiểu thuyết đến khoa học và nhiều thể loại khác. Khám phá ngay những
        cuốn sách tuyệt vời và trải nghiệm những câu chuyện hấp dẫn!
      </p>
    </section>
  );
}

function GenreIllustration({ genre }) {
  return (
    <div className="grid grid-cols-1 grid-rows-1 items-center gap-8 border-t-2 border-black py-8 md:grid-cols-[250px_1fr]">
      <img
        src={`/${genre.slug}-book-cover.png`}
        alt=""
        className="aspect-square w-full object-cover object-top"
      />

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-medium">{genre.displayName}</h3>

        <p className="text-light-black">{genre.description}</p>

        <Link to={`/genres/${genre.slug}`} className="text-lg font-bold">
          Khám phá ngay &#129122;
        </Link>
      </div>
    </div>
  );
}
