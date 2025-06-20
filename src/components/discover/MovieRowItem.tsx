import { itemVariants } from "@/motion/variants/motion";
import { Movie } from "@/types/Movie";
import { SavedMovie } from "@/types/SavedMovies";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  movie?: Movie;
  savedMovie?: SavedMovie;
  selectMovie?: () => void;
}

export default function MovieRowItem({
  movie,
  selectMovie,
  savedMovie,
}: Props) {
  const isMovie = savedMovie?.isMovie ? "movies" : "series";

  return (
    <motion.div
      key={movie?.id || savedMovie?.movie_id}
      className="flex-shrink-0 w-40"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-40 h-60 rounded-xl overflow-hidden group">
        {movie ? (
          <React.Fragment>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.name}
              className="w-full h-full object-cover group-hover:blur-[2px]"
            />
            <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 text-xs text-center">
              <button
                className="cursor-pointer flex items-center space-x-1 transition-all text-blue-400 hover:text-purple-500 uppercase"
                onClick={selectMovie}
              >
                <ExternalLink />
                <p>View</p>
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img
              src={`https://image.tmdb.org/t/p/w500${savedMovie?.poster_path}`}
              alt={savedMovie?.title}
              className="w-full h-full object-cover group-hover:blur-[2px]"
            />
            <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 text-xs text-center">
              <Link
                href={`/${isMovie}/${savedMovie?.movie_id}`}
                className="cursor-pointer flex items-center space-x-1 transition-all text-blue-400 hover:text-purple-500 uppercase"
              >
                <ExternalLink />
                <p>View</p>
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </motion.div>
  );
}
