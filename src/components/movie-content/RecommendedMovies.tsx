'use client';

import { itemVariants } from '@/motion/variants/motion';
import { Movie } from '@/types/Movie';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function RecommendedMovies({
  recommendedMovies,
}: {
  recommendedMovies: Movie[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

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
  }, [recommendedMovies]);

  return (
    <div className="bg-zinc-900 p-5 rounded-lg border border-zinc-700 overflow-hidden">
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
        <div>
          <motion.div ref={containerRef} className="overflow-hidden">
            <motion.div
              ref={innerRef}
              drag="x"
              dragConstraints={{ right: 0, left: dragWidth }}
              className="flex space-x-4 cursor-grab py-5 active:cursor-grabbing"
              viewport={{ once: true, amount: 0.3 }}
            >
              {recommendedMovies.map((movie: Movie) => {
                const [isTapped, setIsTapped] = useState(false);

                return (
                  <motion.div
                    key={movie?.id}
                    className="flex-shrink-0 w-40"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setIsTapped(true)}
                    onMouseLeave={() => setIsTapped(false)}
                  >
                    <div className="relative w-40 h-60 rounded-xl overflow-hidden group">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.name}
                          className={classNames('w-full h-full object-cover', {
                            'blur-[2px] scale-105 transition-all': isTapped,
                            'blur-0 scale-100 transition-all': !isTapped,
                          })}
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-800 rounded-xl" />
                      )}
                      {isTapped && (
                        <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-xs text-center">
                          <Link
                            href={`/${movie.title ? 'movies' : 'series'}/${
                              movie.id
                            }`}
                            target="_blank"
                            className="cursor-pointer flex items-center space-x-1 transition-all text-blue-400 hover:text-purple-500 uppercase"
                          >
                            <ExternalLink />
                            <p>View</p>
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
