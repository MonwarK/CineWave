'use client';

import WatchlistTabs from './WatchlistTabs';
import { useSavedMovies } from '@/context/SavedMoviesProvider';

export default function WatchlistSection() {
  const { savedMovies } = useSavedMovies();

  return (
    <>
      <div className="py-10 space-y-18">
        <WatchlistTabs savedMovies={savedMovies} />
      </div>
    </>
  );
}
