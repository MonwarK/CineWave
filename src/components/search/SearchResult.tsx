import { Movie } from "@/types/Movie";
import { Play, Plus, Star } from "lucide-react";
import React from "react";
import Genres from "../movie-modal/Genres";
import { getGenreNameFromId } from "@/utils/genreMap";
import { motion } from "framer-motion";
import { itemVariants } from "@/motion/variants/motion";

interface Props {
  result: Movie;
}

export default function SearchResult({ result }: Props) {
  const genres = result.genre_ids.map(
    (id, i) =>
      i < 3 && {
        id,
        name: getGenreNameFromId(id),
      }
  );

  return (
    <motion.div
      key={result.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      className="bg-zinc-800/50 rounded-2xl  border border-gray-900 backdrop:blur-2xl overflow-hidden  cursor-pointer flex items-center"
    >
      {/* Thumbnail */}
      <div className="h-60 w-40 flex items-center">
        {result.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${result?.poster_path}`}
            alt=""
            className="w-full h-full object-cover rounded-l-xl"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Title + Type + Rating */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-xl text-white transition-colors">
              {result?.name || result?.title}
            </h3>
            <div className="flex items-center space-x-4 ml-4">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                {result?.name ? "SERIES" : "MOVIE"}
              </span>
              {result.vote_average && (
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">
                    {result.vote_average?.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
            {result?.release_date && (
              <>
                <span>{new Date(result?.release_date).getFullYear()}</span>
                <span>•</span>
              </>
            )}
            <span>2h 15min</span>
            <span>•</span>
            <Genres genres={genres as any} />
          </div>

          {/* Description */}
          <p className="text-gray-300 line-clamp-2">{result.overview}</p>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3 mt-4">
          <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Play className="w-4 h-4 fill-current" />
            <span className="font-semibold">Play</span>
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
