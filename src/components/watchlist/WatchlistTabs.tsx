'use client';
import { SavedMovie } from '@/types/SavedMovies';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import MovieLandscapeThumbnail from '../movie-card/MovieLandscapeThumbnail';

interface Props {
  savedMovies: SavedMovie[];
}

export default function WatchlistTabs({ savedMovies }: Props) {
  const movies = savedMovies.filter(x => x.isMovie === true);
  const shows = savedMovies.filter(x => x.isMovie === false);

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
        {savedMovies.length > 0 ? (
          isActive === 0 ? (
            <AnimatePresence>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <MovieLandscapeThumbnail isMovie={true} movie={movie} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <AnimatePresence>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <MovieLandscapeThumbnail isMovie={false} movie={show} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )
        ) : (
          <div className="text-center text-gray-300 py-5 text-sm">
            <p>You haven't saved any movies or shows</p>
          </div>
        )}
      </div>
    </div>
  );
}
