import React from "react";
import EmblaCarousel from "@/Components/EmblaCarousal/emblacarousal";
import Image from "next/image";

interface Show {
  id: number;
  name: string;
  banner: {
    src: string;
  };
}

interface Genre {
  id: number;
  name: string;
  shows: Show[];
}

interface GenreCarouselItemProps {
  genre: Genre;
  allShows: Show[];
}

const GenreCarouselItem: React.FC<GenreCarouselItemProps> = ({
  genre,
  allShows,
}) => {
  const matchedShows = allShows.filter((show) =>
    genre.shows.some((genreshow) => genreshow.id === show.id)
  );

  return (
    <div className="">
      <h2 className="text-white">{genre.name}</h2>
      <EmblaCarousel
        items={matchedShows.map((show) => (
          <div
            key={show.id}
            className="relative aspect-[2/3] h-full w-full overflow-hidden rounded-lg"
          >
            <Image
              src={show.banner.src}
              alt={show.name}
              width={184}
              height={275}
              className="h-full w-full object-cover rounded"
            />
          </div>
        ))}
      />
    </div>
  );
};

export default GenreCarouselItem;
