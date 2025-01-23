"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const API_KEY = "1a733763d20b5ee36285e6357c022b49";
const BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log(movies, "movies");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchMovies();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2 className="text-white">{movie.title}</h2>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={281}
          />
          <p className="text-white">{movie.overview}</p>
        </div>
      ))}
    </div>
  );
}
