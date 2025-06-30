'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '@/motion/variants/motion';
import MovieRowItem from './MovieRowItem';
import { Movie } from '@/types/Movie';

export default function MovieRowSection({
  title,
  movies,
  setSelectedMovie,
}: any) {
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
  }, [movies]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-2">{title}</h2>

      <motion.div ref={containerRef} className="overflow-hidden">
        <motion.div
          ref={innerRef}
          drag="x"
          dragConstraints={{ right: 0, left: dragWidth }}
          className="flex space-x-4 cursor-grab py-5"
          viewport={{ once: true, amount: 0.3 }}
        >
          {movies.map((movie: Movie) => (
            <MovieRowItem
              key={movie.id}
              movie={movie}
              selectMovie={() => setSelectedMovie(movie)}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
