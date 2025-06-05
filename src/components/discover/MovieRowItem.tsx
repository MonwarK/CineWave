import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "@/motion/variants/motion";
import { Movie } from "@/types/Movie";
import { ExternalLink } from "lucide-react";

interface Props {
  movie: Movie;
  selectMovie: () => void;
}

export default function MovieRowItem({ movie, selectMovie }: Props) {
  return (
    <motion.div
      key={movie.id}
      className="flex-shrink-0 w-40"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-40 h-60 rounded-xl overflow-hidden group">
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
      </div>
    </motion.div>
  );
}
