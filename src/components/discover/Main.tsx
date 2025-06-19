"use client";

import { Movie } from "@/types/Movie";
import { useState } from "react";
import { useExtractColors } from "react-extract-colors";
import MovieModal from "../movie-modal/MovieModal";
import Hero from "./Hero";

interface Props {
  movie: Movie;
}

export default function Main({ movie }: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const proxiedImage = `/api/image-proxy?url=${encodeURIComponent(
    `https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`
  )}`;

  const { lighterColor } = useExtractColors(proxiedImage);

  const openMovie = () => setSelectedMovie(movie);

  return (
    <>
      <div className="relative flex flex-col min-h-[95vh] overflow-hidden justify-center">
        <div className="absolute w-full h-full">
          <img
            className="absolute -z-10 top-0 left-0 brightness-75 w-full h-full object-cover object-top"
            src={proxiedImage}
            alt=""
          />

          <div className="left-0 bottom-0 absolute w-full bg-gradient-to-t from-zinc-950/80 to-transparent h-10 "></div>
        </div>

        <div />

        <Hero
          movie={movie}
          openMovie={openMovie}
          dominantColor={lighterColor}
        />

        {/* <div className="bg-black/20 backdrop-blur-xl">
          <div className="max-w-screen-xl mx-auto hidden md:block px-10">
            <div className="grid grid-cols-5 text-center text-sm">
              <div className="py-5 border-b-2 border-orange-500">
                Trending Now
              </div>
              <div className="py-5 text-white/50 hover:text-white/90 cursor-pointer">
                TV Shows
              </div>
              <div className="py-5 text-white/50 hover:text-white/90 cursor-pointer">
                Movies
              </div>
              <div className="py-5 text-white/50 hover:text-white/90 cursor-pointer">
                Recently Added
              </div>
              <div className="py-5 text-white/50 hover:text-white/90 cursor-pointer">
                My List
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
