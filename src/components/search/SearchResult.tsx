'use client';

import { Movie } from '@/types/Movie';
import { Check, Info, Play, Plus, Star } from 'lucide-react';
import React from 'react';
import Genres from '../movie-modal/Genres';
import { getGenreNameFromId } from '@/utils/genreMap';
import { motion } from 'framer-motion';
import { itemVariants } from '@/motion/variants/motion';
import Link from 'next/link';
import { useSavedMovies } from '@/context/SavedMoviesProvider';
import SquaredButton from '../ui/SquaredButton';

interface Props {
  result: Movie;
}

export default function SearchResult({ result }: Props) {
  const { addMovie, isSaved } = useSavedMovies();

  const isResultSaved = isSaved(result.id);

  const genres = result.genre_ids.map(
    (id, i) =>
      i < 3 && {
        id,
        name: getGenreNameFromId(id),
      }
  );

  const getLength = () => {
    if (result.name) {
      const seasonCount = Math.floor(Math.random() * 6) + 1;
      return `${seasonCount} seasons`;
    }

    const randomHour = Math.round(Math.random() * 2) + 1;
    const randomMinutes = Math.floor(Math.random() * 60) + 1;

    return `${randomHour}h ${randomMinutes}min`;
  };

  const resultType = result?.name
    ? { name: 'Series', url: 'series' }
    : { name: 'Movies', url: 'movies' };

  return (
    <motion.div
      key={result.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-zinc-800/50 rounded-2xl backdrop:blur-2xl overflow-hidden cursor-pointer flex items-center"
    >
      {/* Thumbnail */}
      <div className="flex items-center h-60">
        {result.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${result?.poster_path}`}
            alt=""
            className="h-full object-cover rounded-l-xl"
          />
        ) : (
          <img
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s`}
            alt=""
            className="h-full w-40 object-cover rounded-l-xl brightness-50"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Title + Type + Rating */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold md:text-xl text-white transition-colors">
              {result?.name || result?.title}
            </h3>
            <div className="flex items-center md:space-x-4 ml-4">
              {result.vote_average > 0 && (
                <div className="hidden md:flex items-center md:space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">
                    {result.vote_average?.toFixed(1)}
                  </span>
                </div>
              )}
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded uppercase">
                {resultType.name}
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400 mb-3">
            {result?.release_date && (
              <>
                <span>{new Date(result?.release_date).getFullYear()}</span>
                <span>•</span>
              </>
            )}
            <span>{getLength()}</span>
            <span>•</span>
            <Genres genres={genres as any} />
          </div>

          {/* Description */}
          <p className="text-gray-300 line-clamp-2">{result.overview}</p>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3 mt-4">
          <Link href={`/${resultType.url}/watch/${result.id}`} target="_blank">
            <SquaredButton variant="primary">
              <Play className="w-4 h-4 fill-current" />
              <span className="font-semibold">Play</span>
            </SquaredButton>
          </Link>
          <Link href={`/${resultType.url}/${result.id}`} target="_blank">
            <SquaredButton
              variant="secondary"
              className="border-none hover:opacity-95"
            >
              <span className="font-semibold">Details</span>
            </SquaredButton>
          </Link>
          <SquaredButton
            variant="info"
            className="rounded-3xl"
            onClick={() => addMovie(result)}
          >
            {isResultSaved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </SquaredButton>
        </div>
      </div>
    </motion.div>
  );
}
