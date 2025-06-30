'use client';

import { SavedMovie } from '@/types/SavedMovies';
import { SeriesProgress } from '@/types/SeriesProgress';
import clsx from 'clsx';
import React, { useState } from 'react';
import { WatchlistGrid } from './WatchlistGrid';
import ContinueWatching from './ContinueWatching';

interface Props {
  savedMovies: SavedMovie[];
  continueWatching: SeriesProgress[];
}

export default function WatchlistTabs({
  savedMovies,
  continueWatching,
}: Props) {
  const movies = savedMovies.filter(x => x.isMovie);
  const shows = savedMovies.filter(x => !x.isMovie);

  const [isActive, setIsActive] = useState(movies.length > 0 ? 0 : 1);
  const [showContinueWatching, setShowContinueWatching] = useState(true);

  return (
    <div>
      <div className="flex rounded-md w-fit items-center mb-10 overflow-hidden shadow-md">
        {shows.length > 0 && movies.length > 0 && (
          <>
            <button
              className={clsx(
                isActive === 0 ? 'bg-orange-900' : 'bg-orange-950',
                'px-4 py-2 transition duration-300 cursor-pointer w-20'
              )}
              onClick={() => {
                setIsActive(0);
                setShowContinueWatching(false);
              }}
            >
              All
            </button>
            <button
              className={clsx(
                isActive === 1 ? 'bg-orange-900' : 'bg-orange-950',
                'px-4 py-2 transition duration-300 cursor-pointer w-20'
              )}
              onClick={() => {
                setIsActive(1);
                setShowContinueWatching(false);
              }}
            >
              Movies
            </button>
            <button
              className={clsx(
                isActive === 2 ? 'bg-orange-900' : 'bg-orange-950',
                'px-4 py-2 transition duration-300 cursor-pointer w-20'
              )}
              onClick={() => {
                setIsActive(2);
                setShowContinueWatching(false);
              }}
            >
              Shows
            </button>
          </>
        )}
      </div>

      <div>
        <div className="mb-5">
          <ContinueWatching
            continueWatching={continueWatching}
            intialShowContinueWatching={showContinueWatching}
          />
        </div>

        {savedMovies.length > 0 && isActive === 0 && (
          <section>
            <h2 className="text-2xl mb-5 uppercase font-bold">All Watchlist</h2>
            <WatchlistGrid items={savedMovies} />
          </section>
        )}

        {movies.length > 0 && isActive === 1 && (
          <section>
            <h2 className="text-2xl mb-5 uppercase font-bold">Saved Movies</h2>
            <WatchlistGrid items={movies} />
          </section>
        )}

        {shows.length > 0 && isActive === 2 && (
          <section>
            <h2 className="text-2xl mb-5 uppercase font-bold">Saved Shows</h2>
            <WatchlistGrid items={shows} />
          </section>
        )}

        {savedMovies.length === 0 && continueWatching.length === 0 && (
          <div className="text-center text-gray-300 py-5 text-sm">
            <p>You haven't saved any movies or shows</p>
          </div>
        )}
      </div>
    </div>
  );
}
