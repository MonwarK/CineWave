import { SavedMovie } from '@/types/SavedMovies';
import { SeriesProgress } from '@/types/SeriesProgress';
import { AnimatePresence, motion } from 'framer-motion';
import MovieLandscapeThumbnail from '../movie-card/MovieLandscapeThumbnail';

function isSavedMovie(movie: SavedMovie | SeriesProgress): movie is SavedMovie {
  return (movie as SavedMovie).isMovie !== undefined;
}

export function WatchlistGrid({
  items,
}: {
  items: (SavedMovie | SeriesProgress)[];
}) {
  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {items.map(item => (
            <motion.div
              key={item.id}
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
                isMovie={isSavedMovie(item) ? item.isMovie : false}
                movie={item}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
