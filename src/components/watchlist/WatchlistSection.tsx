'use client';

import { SeriesProgress } from '@/types/SeriesProgress';
import WatchlistTabs from './WatchlistTabs';
import { useSavedMovies } from '@/context/SavedMoviesProvider';

export default function WatchlistSection({
  seriesProgress,
}: {
  seriesProgress: SeriesProgress[];
}) {
  const { savedMovies } = useSavedMovies();

  return (
    <>
      <div className="py-10 space-y-18">
        <WatchlistTabs
          savedMovies={savedMovies}
          continueWatching={seriesProgress}
        />
      </div>
    </>
  );
}
