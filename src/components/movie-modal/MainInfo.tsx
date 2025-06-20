"use client";
import { useSavedMovies } from "@/context/SavedMoviesProvider";
import { Movie } from "@/types/Movie";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import Genres from "./Genres";
import Meta from "./Meta";

interface Props {
  fullMovie: Movie;

}

export default function MainInfo({ fullMovie }: Props) {
  const { addMovie, isSaved } = useSavedMovies();

  const isMovieSaved = isSaved(fullMovie.id);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const mediaType =
    fullMovie.media_type || (fullMovie.name ? "series" : "movies");

  return (
    <div className="p-4 space-y-5 items-center">
      <h2 className="text-2xl font-bold">
        {fullMovie.title || fullMovie.name}
      </h2>

      <div
        className={classNames(
          "justify-between items-center space-y-5 space-x-4 text-xs",
          {
            "md:flex md:space-y-0": fullMovie.genres.length < 4,
          }
        )}
      >
        <Meta
          vote_average={fullMovie.vote_average}
          release_date={fullMovie.release_date}
        />
        <Genres genres={fullMovie.genres} />
      </div>

      <div className="col-span-2">
        <p className="text-sm text-neutral-300 line-clamp-4 ">
          {fullMovie.overview}
        </p>
      </div>

      <div className="flex flex-row gap-2">
        <button
          onClick={() => addMovie(fullMovie)}
          className="hover:bg-white hover:text-gray-800 transition bg-black/30 rounded-md cursor-pointer border-2 border-white uppercase px-5 py-2  font-semibold"
        >
          {isMovieSaved ? "Saved" : "Add To List"}
        </button>
        <Link href={`/${mediaType}/${fullMovie.id}`}>
          <button className="hover:bg-white hover:text-gray-800 transition bg-black/30 rounded-md cursor-pointer border-2 border-white uppercase px-5 py-2  font-semibold">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
