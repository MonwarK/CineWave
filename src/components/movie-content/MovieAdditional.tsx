import { Movie } from "@/types/Movie";
import React from "react";

export default function MovieAdditional({ movie }: { movie: Movie }) {
  return (
    <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700">
      <div className="space-y-5 flex flex-col justify-between h-full">
        <div className="text-xl uppercase font-semibold">
          Additional Information
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium uppercase text-gray-400">
                Spoken Languages
              </p>
            </div>
            <div>
              <div className="flex space-x-3">
                {movie.spoken_languages?.map((language) => (
                  <div
                    key={`language-${language.iso_639_1}`}
                    className="bg-gray-700/50 border border-gray-600 text-gray-400 text-xs px-3 py-1 rounded-full"
                  >
                    {language.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-500 my-4" />
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-zinc-700/50 text-sm border border-gray-600 p-4 pb-8 rounded-md text-center">
            <div>
              <p className="uppercase mb-2 text-gray-300">Original Language</p>
            </div>
            <div>
              <p>{movie.spoken_languages?.[0].name}</p>
            </div>
          </div>

          <div className="bg-zinc-700/50 text-sm border border-gray-600 p-4 pb-8 rounded-md text-center">
            <div>
              <p className="uppercase mb-2 text-gray-300">Original Country</p>
            </div>
            <div>
              <p>{movie.origin_country?.[0]}</p>
            </div>
          </div>

          <div className="bg-zinc-700/50 text-sm border border-gray-600 p-4 pb-8 rounded-md text-center">
            <div>
              <p className="uppercase mb-2 text-gray-300">Adult</p>
            </div>
            <div>{movie.adult === true ? <p>Adult</p> : <p>Not Adult</p>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
