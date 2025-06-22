'use client';

import { containerVariants } from '@/motion/variants/motion';
import React from 'react';
import { motion } from 'framer-motion';
import SearchResult from './SearchResult';
import { Movie } from '@/types/Movie';

interface Props {
  results: Movie[];
}

export default function SearchResults({ results }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-4"
    >
      {results.map((result: Movie) => (
        <SearchResult key={result?.id} result={result} />
      ))}
    </motion.div>
  );
}
