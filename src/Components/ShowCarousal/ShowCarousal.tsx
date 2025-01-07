"use client";
import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
interface Show {
  id: number;
  name: string;
  banner: {
    src: string;
  };
  poster: {
    src: string;
  };
}

interface CarouselProps {
  shows: Show[];
}

const ShowCarousal: React.FC<CarouselProps> = ({ shows }) => {
  const [emblaRef] = useEmblaCarousel();
  return (
    <>
      <div
        className="relative w-full py-4 sm:overflow-hidden sm:py-6 [&.is-draggable]:cursor-grab [&.is-dragging]:cursor-grabbing is-draggable"
        ref={emblaRef}
      >
        <div className="flex select-none gap-[var(--gap)] ease-out-quad [--gap:16px] [-webkit-tap-highlight-color:transparent] sm:[--gap:22px]">
          {shows.map((show) => (
            <div
              key={show.id}
              className="embla__slide relative w-[calc(40%-var(--gap)*2/2.5)] shrink-0 sm:w-[calc(33.33%-var(--gap)*2/3)] md:w-[calc(25%-var(--gap)*3/4)] lg:w-[calc(20%-var(--gap)*4/5)] xl:w-[calc(16.66%-var(--gap)*5/6)]"
            >
              <Image
                src={show.poster.src}
                alt={show.name}
                width={184}
                height={275}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <button className="embla__button embla__button--prev" type="button">
            <svg
              className="embla__button__svg"
              viewBox="0 0 532 532"
              width={24}
              height={24}
            >
              <path
                fill="#fff"
                d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
              ></path>
            </svg>
          </button>

          <button className="embla__button embla__button--next" type="button">
            <svg
              className="embla__button__svg"
              viewBox="0 0 532 532"
              width={24}
              height={24}
            >
              <path
                fill="#fff"
                d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ShowCarousal;
