import Herocarousal from "@/Components/HeroSection/herocarousal";
import ShowCarousal from "@/Components/ShowCarousal/ShowCarousal";
import Image from "next/image";

interface Banner {
  src: string;
}

interface Show {
  poster: never;
  id: number;
  name: string;
  banner: Banner;
}

interface Genre {
  shows: unknown;
  id: number;
  name: string;
  banner: Banner;
}

interface ApiResponse<T> {
  data: T[];
}

interface Show {
  id: number;
  name: string;
  poster: {
    src: string;
  };
}

interface ShowCarouselProps {
  shows: Show[];
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
  console.log(shows, "shows");
  console.log(genres, "Genres");

  return (
    <main>
      <Herocarousal shows={shows} />
      <section className="mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-[1280px] flex flex-col space-y-14 overflow-hidden pb-[18px] pt-[50px] sm:space-y-12 sm:overflow-visible sm:pb-[107px]">
        <ShowCarousal shows={shows} />
        {genres.length > 0 && (
          <ul className="space-y-4">
            {genres.map((genre) => (
              <li key={genre.id} className="text-white">
                {genre.shows.length > 0 && (
                  <h2 className="text-white">{genre.name}</h2>
                )}
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {genre.shows.length > 0 &&
                    shows
                      .filter((show) =>
                        genre.shows?.some(
                          (genreshow: { id: number }) =>
                            genreshow.id === show.id
                        )
                      )
                      .map((matchedShow) => (
                        <div
                          key={matchedShow.id}
                          className="relative aspect-[2/3]"
                        >
                          <Image
                            src={matchedShow.banner.src}
                            alt={matchedShow.name}
                            width={184}
                            height={275}
                            className="h-full w-full object-cover rounded"
                          />
                        </div>
                      ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        {shows.map((show) => (
          <h1 className="text-white">{show.name}</h1>
        ))}
      </section>
    </main>
  );
}
