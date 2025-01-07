import React from "react";
import ShowCarousal from "@/Components/ShowCarousal/ShowCarousal";
import GenreCarouselItem from "@/Components/ShowCarousal/CategoryCarousal";
import HeroCarousal from "@/Components/HeroSection/herocarousal";

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
  shows: { id: number }[];
}

interface ApiResponse<T> {
  data: T[];
}

const fetchData = async <T,>(url: string): Promise<T[]> => {
  try {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }
    const response: ApiResponse<T> = await result.json();
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchShows = () =>
  fetchData<Show>("https://strapi.tmls.dev/api/shows?populate=*");
const fetchGenres = () =>
  fetchData<Genre>("https://strapi.tmls.dev/api/genres?populate=*");

export default async function Home() {
  const [shows, genres] = await Promise.all([fetchShows(), fetchGenres()]);

  return (
    <main>
      <HeroCarousal shows={shows} />
      <section className="mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-[1280px] flex flex-col space-y-10 pb-[18px] pt-[50px] sm:space-y-12 sm:overflow-visible sm:pb-[107px]">
        <ShowCarousal shows={shows} />
        {genres.map((genre) => (
          <GenreCarouselItem key={genre.id} genre={genre} allShows={shows} />
        ))}
      </section>
    </main>
  );
}
