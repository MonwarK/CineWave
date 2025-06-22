import { itemVariants } from '@/motion/variants/motion';
import { Movie } from '@/types/Movie';
import { SavedMovie } from '@/types/SavedMovies';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

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
  const [isTapped, setIsTapped] = useState(false);
  const isMovie = savedMovie?.isMovie ? 'movies' : 'series';

  return (
    <motion.div
      key={movie?.id || savedMovie?.movie_id}
      className="flex-shrink-0 w-40"
      variants={itemVariants}
      onMouseEnter={() => setIsTapped(true)}
      onMouseLeave={() => setIsTapped(false)}
    >
      <div className="relative w-40 h-60 rounded-xl overflow-hidden group">
        {movie ? (
          <React.Fragment>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.name}
              className={classNames('w-full h-full object-cover', {
                'blur-[2px] scale-105 transition-all': isTapped,
                'blur-0 scale-100 transition-all': !isTapped,
              })}
            />
            {isTapped && (
              <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center transition duration-300 text-xs text-center">
                <button
                  className="cursor-pointer flex items-center space-x-1 transition-all text-blue-400 hover:text-purple-500 uppercase"
                  onClick={selectMovie}
                >
                  <ExternalLink />
                  <p>View</p>
                </button>
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img
              src={`https://image.tmdb.org/t/p/w500${savedMovie?.poster_path}`}
              alt={savedMovie?.title}
              className="w-full h-full object-cover group-hover:blur-[2px]"
            />
            {isTapped && (
              <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center transition duration-300 text-xs text-center">
                <Link
                  href={`/${isMovie}/${savedMovie?.movie_id}`}
                  className="cursor-pointer flex items-center space-x-1 transition-all text-blue-400 hover:text-purple-500 uppercase"
                >
                  <ExternalLink />
                  <p>View</p>
                </Link>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </motion.div>
  );
}
