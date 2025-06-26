'use client';

import { useSavedMovies } from '@/context/SavedMoviesProvider';
import { itemVariants } from '@/motion/variants/motion';
import { Genre, Movie } from '@/types/Movie';
import { getGenreNameFromId } from '@/utils/genreMap';
import { motion } from 'framer-motion';
import { Check, Play, Plus, Star } from 'lucide-react';
import Link from 'next/link';
import Genres from '../movie-modal/Genres';
import SquaredButton from '../ui/SquaredButton';

interface Props {
  result: Movie;
}

export default function SearchResult({ result }: Props) {
  const { addMovie, deleteMovie, isSaved } = useSavedMovies();

  const isMovie = result.title ? true : false;
  const isResultSaved = isSaved(result.id, isMovie);

  const genres =
    result?.genre_ids?.map(
      (id, i) =>
        i < 3 && {
          id,
          name: getGenreNameFromId(id),
        }
    ) || [];

  const resultType = result?.name
    ? { name: 'Series', url: 'series' }
    : { name: 'Movies', url: 'movies' };

  const isReleased =
    new Date() >= new Date(result.release_date || result.first_air_date);

  return (
    <motion.div
      key={result.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={itemVariants}
      className="bg-zinc-800/50 rounded-md backdrop:blur-2xl overflow-hidden flex items-center"
    >
      {/* Thumbnail */}
      <div className="flex items-center h-60">
        {result.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${result?.poster_path}`}
            alt=""
            className="h-full object-cover rounded-l-xl hidden sm:block"
          />
        ) : (
          <img
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s`}
            alt=""
            className="h-full w-40 object-cover rounded-l-xl brightness-50 hidden sm:block"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-60 p-6">
        <div className="flex-1">
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
            <Genres genres={genres as Genre[]} />
          </div>

          {/* Description */}
          <p className="text-gray-300 line-clamp-4 md:line-clamp-3 flex-1">
            {result.overview}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3 mt-4">
          {isReleased && (
            <Link
              href={`/${resultType.url}/watch/${result.id}`}
              target="_blank"
            >
              <SquaredButton variant="primary">
                <Play size={18} className="fill-white" />
                <span className="font-semibold">Play</span>
              </SquaredButton>
            </Link>
          )}
          <Link href={`/${resultType.url}/${result.id}`} target="_blank">
            <SquaredButton
              variant="secondary"
              className="!border-zinc-900 hover:opacity-95"
            >
              <span className="font-semibold">Details</span>
            </SquaredButton>
          </Link>
          <SquaredButton
            variant="info"
            className="rounded-3xl"
            onClick={() =>
              isSaved(result.id, isMovie)
                ? deleteMovie(result, isMovie)
                : addMovie(result, isMovie)
            }
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
