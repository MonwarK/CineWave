import { Movie } from "@/types/Movie";
import React from "react";

interface Props {
  movie: Movie;
  loading: boolean;
  dominantColor: string | null;
  openMovie: () => void;
}

export default function Hero({
  movie,
  loading,
  dominantColor,
  openMovie,
}: Props) {
  function isColorDark(hex: string): boolean {
    // Remove # if present
    const cleanHex = hex.replace("#", "");

    // Convert to RGB
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // Calculate luminance (per W3C)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    // Threshold: if it's < 128, it's "dark"
    return luminance < 128;
  }

  console.log(movie);

  return (
    <div className="max-w-screen-xl mx-auto w-full px-10">
      <div className="space-y-4 md:space-y-6 md:w-1/2">
        <div className="flex space-x-4 items-center">
          <div>{movie.vote_average.toFixed(1)}</div>
          <div>
            {new Date(movie.release_date || movie.first_air_date).getFullYear()}
          </div>
        </div>
        <div>
          <div className="text-4xl font-medium tracking-[0.2em] uppercase">
            {movie.title || movie.name}
          </div>
        </div>
        <div>
          <div>{movie.overview}</div>
        </div>
        {dominantColor && (
          <div className="sm:flex space-y-5 md:space-y-0 md:space-x-5 uppercase py-5">
            <div
              onClick={openMovie}
              style={{
                backgroundColor: dominantColor || undefined,
                color: isColorDark(dominantColor) ? "black" : "white",
              }}
              className="hover:opacity-85 cursor-pointer backdrop-blur-2xl py-3 px-10 tracking-wider font-medium spacing-x-2 rounded-full transition"
            >
              Watch
            </div>
            <div className="bg-gray-800/20 hover:opacity-85 cursor-pointer backdrop-blur-2xl py-3 px-10 tracking-wider font-medium spacing-x-2 rounded-full transition">
              Add To List
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
