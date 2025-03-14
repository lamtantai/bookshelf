import { Swiper, SwiperSlide } from "swiper/react";

export default function SlideItems({ items, renderItem, gap = 12 }) {
  return (
    <Swiper
      spaceBetween={gap}
      slidesPerView="auto"
      className="select-none overflow-hidden"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className="flex-shrink-0">
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
