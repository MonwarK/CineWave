'use client';
import { Movie } from '@/types/Movie';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import MovieLandscapeThumbnail from '../movie-card/MovieLandscapeThumbnail';
import SquaredButton from '../ui/SquaredButton';

interface Props {
  shows: Movie[];
  movies: Movie[];
}

export default function Tabs({ shows, movies }: Props) {
  const initialSearchResults = 6;
  const increaseSearch = 9;

  const [isActive, setIsActive] = useState(0);
  const [visibleResults, setVisibleResults] = useState(initialSearchResults);

  const resetResults = () => setVisibleResults(6);
  const loadMoreResults = () =>
    setVisibleResults(visibleResults + increaseSearch);

  const changeTab = (tabIndex: number) => {
    resetResults();
    setIsActive(tabIndex);
  };

  return (
    <div>
      <div className="flex flex-row justify-center space-x-4 mt-4  rounded-md w-fit p-2 mx-auto items-center mb-4">
        <button
          className={clsx(
            isActive === 0 ? 'bg-orange-900' : 'bg-black/50',
            'px-4 py-2 rounded-md transition duration-300 cursor-pointer'
          )}
          onClick={() => changeTab(0)}
        >
          Movies
        </button>
        <button
          className={clsx(
            isActive === 1 ? 'bg-orange-900' : 'bg-black/50',
            'px-4 py-2 rounded-md transition duration-300 cursor-pointer'
          )}
          onClick={() => changeTab(1)}
        >
          Shows
        </button>
      </div>
      <div>
        {isActive === 0 ? (
          <React.Fragment>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {movies.slice(0, visibleResults).map((movie: Movie) => (
                  <motion.div
                    key={`trending-${movie.id}`}
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
                    <MovieLandscapeThumbnail
                      isMovie={true}
                      key={`movie-thumbnail-${movie.id}`}
                      movie={movie}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div>
              {movies.length > visibleResults && (
                <SquaredButton
                  onClick={loadMoreResults}
                  className="mt-6"
                  variant="secondary"
                >
                  Load More Movies
                </SquaredButton>
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shows.slice(0, visibleResults).map((show: Movie) => (
                <motion.div
                  key={`trending-${show.id}`}
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
                  <MovieLandscapeThumbnail
                    isMovie={false}
                    key={`movie-thumbnail-${show.id}`}
                    movie={show}
                  />
                </motion.div>
              ))}
            </div>
            <div>
              {shows.length > visibleResults && (
                <SquaredButton
                  onClick={loadMoreResults}
                  className="mt-6"
                  variant="secondary"
                >
                  Load More Shows
                </SquaredButton>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
