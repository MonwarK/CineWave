import { Movie } from "@/types/Movie";
import React, { useEffect, useState } from "react";

interface Props {
  movie: Movie;
  dominantColor: string | null;
  openMovie: () => void;
}

export default function Hero({ movie, dominantColor, openMovie }: Props) {
  const [color, setColor] = useState<string>("white");

  useEffect(() => {
    const isDark = isColorDark(dominantColor || "#000000"); // your color logic
    setColor(isDark ? "black" : "white");
  }, [dominantColor]);

  function isColorDark(hex: string): boolean {
    const cleanHex = hex.replace("#", "");

    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const linear = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

    const l = 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);

    return l <= 0.179;
  }

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
          <div className="text-3xl md:text-4xl font-medium tracking-[0.2em] uppercase">
            {movie.title || movie.name}
          </div>
        </div>
        <div>
          <p>{movie.overview}</p>
        </div>
        {dominantColor && (
          <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-5 uppercase py-5">
            <div
              onClick={openMovie}
              style={{
                backgroundColor: dominantColor || undefined,
                color,
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
