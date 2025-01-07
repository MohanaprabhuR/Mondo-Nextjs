"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";
interface EmblaCarouselProps {
  items: React.ReactNode[];
  className?: string;
  loop?: boolean;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
  items,
  className = "",
  loop = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Update navigation buttons state
  const updateButtonStates = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtonStates);
    emblaApi.on("reInit", updateButtonStates);
    updateButtonStates();
  }, [emblaApi, updateButtonStates]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={`embla ${className}`}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item, index) => (
            <div key={index} className="embla__slide">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <button
          className={`embla__button embla__button--prev ${
            canScrollPrev ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          Prev
        </button>
        <button
          className={`embla__button embla__button--next ${
            canScrollNext ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
