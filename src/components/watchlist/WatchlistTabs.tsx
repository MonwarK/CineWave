'use client';
import { SavedMovie } from '@/types/SavedMovies';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import MovieRowItem from '../discover/MovieRowItem';

interface Props {
  SavedMovies: SavedMovie[];
}

export default function WatchlistTabs({ SavedMovies }: Props) {
  const movies = SavedMovies.filter(x => x.isMovie === true);
  const shows = SavedMovies.filter(x => x.isMovie === false);

  const [isActive, setIsActive] = useState(movies.length > 0 ? 0 : 1);

  return (
    <div>
      <div className="flex justify-center space-x-4 rounded-md w-fit p-2 mx-auto items-center mb-4">
        {shows.length > 0 && movies.length > 0 && (
          <React.Fragment>
            <button
              className={clsx(
                isActive === 0 ? 'bg-orange-900' : 'bg-black/50',
                'px-4 py-2 rounded-md transition duration-300 cursor-pointer'
              )}
              onClick={() => setIsActive(0)}
            >
              Movies
            </button>
            <button
              className={clsx(
                isActive === 1 ? 'bg-orange-900' : 'bg-black/50',
                'px-4 py-2 rounded-md transition duration-300 cursor-pointer'
              )}
              onClick={() => setIsActive(1)}
            >
              Shows
            </button>
          </React.Fragment>
        )}
      </div>

      <div>
        {isActive === 0 ? (
          <AnimatePresence>
            <div className="flex justify-center gap-5 flex-wrap px-5">
              {movies.map((movie: SavedMovie) => (
                <motion.div
                  key={movie.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    duration: 1,
                    delay: 0.25,
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <MovieRowItem key={movie.id} savedMovie={movie} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <div className="flex justify-center gap-5 flex-wrap px-5">
              {shows.map((show: SavedMovie) => (
                <motion.div
                  key={show.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    duration: 1,
                    delay: 0.25,
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <MovieRowItem key={show.id} savedMovie={show} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
