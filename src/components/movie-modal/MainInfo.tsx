import React from "react";
import Meta from "./Meta";
import Genres from "./Genres";
import { Movie } from "@/types/Movie";

interface Props {
  fullMovie: Movie;
}

export default function MainInfo({ fullMovie }: Props) {
  return (
    <div className="p-4 space-y-5 items-center">
      <h2 className="text-2xl font-bold">
        {fullMovie.title || fullMovie.name}
      </h2>

      <div className="md:flex justify-between items-center space-y-5 md:space-y-0 space-x-4 text-xs">
        <Meta
          vote_average={fullMovie.vote_average}
          release_date={fullMovie.release_date}
        />
        <Genres genres={fullMovie.genres} />
      </div>

      <div className="col-span-2">
        <p className="text-sm text-neutral-300">{fullMovie.overview}</p>
      </div>

      <div>
        <button className="hover:bg-white hover:text-gray-800 transition bg-black/30 rounded-md cursor-pointer border-2 border-white uppercase px-5 py-2  font-semibold">
          Add to List
        </button>
      </div>
    </div>
  );
}
