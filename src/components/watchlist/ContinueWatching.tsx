import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { WatchlistGrid } from './WatchlistGrid';
import { motion } from 'framer-motion';
import { SeriesProgress } from '@/types/SeriesProgress';
import MovieLandscapeThumbnail from '../movie-card/MovieLandscapeThumbnail';
import { containerVariants, itemVariants } from '@/motion/variants/motion';

export default function ContinueWatching({
  continueWatching,
  intialShowContinueWatching = true,
  showToggle = true,
}: {
  continueWatching: SeriesProgress[];
  intialShowContinueWatching?: boolean;
  showToggle?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  const [showWatching, setShowWatching] = useState(intialShowContinueWatching);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current && innerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const innerWidth = innerRef.current.scrollWidth;
        setDragWidth(containerWidth - innerWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [continueWatching]);

  useEffect(() => {
    setShowWatching(intialShowContinueWatching);
  }, [intialShowContinueWatching]);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl uppercase font-bold">Continue Watching</h2>
        {showToggle && (
          <button
            className="text-sm text-orange-400 hover:underline cursor-pointer"
            onClick={() => setShowWatching(!showWatching)}
          >
            {showWatching ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showWatching && (
          <motion.div
            key="continue"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div ref={containerRef} className="overflow-hidden">
              <motion.div
                ref={innerRef}
                drag="x"
                dragConstraints={{ right: 0, left: dragWidth }}
                className="flex gap-5 cursor-grab py-5"
                viewport={{ once: true, amount: 0.3 }}
              >
                {continueWatching.map(media => (
                  <motion.div
                    variants={itemVariants}
                    className="flex-none w-3/4 md:w-1/2 lg:w-1/3"
                  >
                    <MovieLandscapeThumbnail movie={media} isMovie={false} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
