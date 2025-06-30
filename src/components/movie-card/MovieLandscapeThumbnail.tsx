'use client';

import { useSavedMovies } from '@/context/SavedMoviesProvider';
import { itemVariants } from '@/motion/variants/motion';
import { Movie } from '@/types/Movie';
import { SavedMovie } from '@/types/SavedMovies';
import { SeriesProgress } from '@/types/SeriesProgress';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Check, Info, Play, Plus, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
  movie: Movie | SavedMovie | SeriesProgress;
  isMovie: boolean;
}

function isFullMovie(
  movie: Movie | SavedMovie | SeriesProgress
): movie is Movie {
  return (movie as Movie).adult !== undefined;
}

function isSeriesProgress(
  movie: Movie | SavedMovie | SeriesProgress
): movie is SeriesProgress {
  return 'show_id' in movie && 'season' in movie && 'episode' in movie;
}

export default function MovieLandscapeThumbnail({ movie, isMovie }: Props) {
  const { addMovie, deleteMovie, isSaved } = useSavedMovies();
  const [isTapped, setIsTapped] = useState(false);
  const isFull = isFullMovie(movie);

  const isReleased =
    isFull &&
    new Date() >= new Date(movie.release_date || movie.first_air_date);

  const imagePath = isFull ? movie.backdrop_path : movie.poster_path;

  const title = movie.title || (isFull ? movie.name : '');
  const overview = movie.overview;

  const movieId = isFull
    ? movie.id
    : 'movie_id' in movie
    ? movie.movie_id
    : (movie as SeriesProgress).show_id;

  return (
    <motion.div
      className="cursor-pointer"
      key={movieId}
      variants={itemVariants}
      onMouseEnter={() => setIsTapped(true)}
      onMouseLeave={() => setIsTapped(false)}
    >
      <div className="relative rounded-xl overflow-hidden group hover:shadow-md">
        <img
          src={`https://image.tmdb.org/t/p/w1280${imagePath}`}
          alt={title || 'Poster'}
          className={classNames('w-full h-full object-cover transition-all', {
            'blur-[2px] scale-105': isTapped,
            'blur-0 scale-100': !isTapped,
          })}
        />
        {isTapped && (
          <div className="absolute inset-0 bg-black/60 text-white transition duration-300 text-xs">
            <div className="p-5 flex flex-col justify-between h-full space-y-3">
              <div>
                <h2 className="text-lg font-medium line-clamp-1">{title}</h2>
                {isFull && (
                  <div className="flex items-center space-x-1">
                    <Star
                      className="fill-yellow-400 text-yellow-400"
                      size={12}
                    />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="line-clamp-3">{overview}</p>
              </div>

              <div className="flex items-center space-x-2">
                {isFull && isReleased && (
                  <Link
                    href={
                      isMovie
                        ? `/movies/watch/${movieId}`
                        : `/series/watch/${movieId}`
                    }
                    target="_blank"
                  >
                    <button className="bg-[#d36013] hover:opacity-80 transition text-white cursor-pointer px-4 py-2 rounded-full uppercase font-bold flex items-center space-x-1">
                      <Play size={14} className="fill-white" />
                      <p>
                        Play{' '}
                        {isSeriesProgress(movie) && (
                          <React.Fragment>
                            • S{movie.season} E{movie.episode}
                          </React.Fragment>
                        )}
                      </p>
                    </button>
                  </Link>
                )}

                {!isFull && (
                  <Link
                    href={
                      isMovie
                        ? `/movies/watch/${movieId}`
                        : `/series/watch/${movieId}`
                    }
                    target="_blank"
                  >
                    <button className="bg-[#d36013] hover:opacity-80 transition text-white cursor-pointer px-4 py-2 rounded-full uppercase font-bold flex items-center space-x-1">
                      <Play size={14} className="fill-white" />
                      <p>
                        Play{' '}
                        {isSeriesProgress(movie) && (
                          <React.Fragment>
                            • S{movie.season} E{movie.episode}
                          </React.Fragment>
                        )}
                      </p>
                    </button>
                  </Link>
                )}

                <Link
                  href={isMovie ? `/movies/${movieId}` : `/series/${movieId}`}
                >
                  <button className="bg-gray-800/20 hover:opacity-85 cursor-pointer backdrop-blur-2xl py-2 px-4 tracking-wider font-medium rounded-full transition uppercase flex items-center space-x-2">
                    <Info size={16} />
                    <p>Details</p>
                  </button>
                </Link>

                {isFull &&
                  (isSaved(Number(movie.id), isMovie) ? (
                    <button
                      onClick={() => deleteMovie(movie, isMovie)}
                      className="p-2 bg-white/20 rounded-full cursor-pointer hover:opacity-80 transition"
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => addMovie(movie, isMovie)}
                      className="p-2 bg-white/20 rounded-full cursor-pointer hover:opacity-80 transition"
                    >
                      <Plus size={16} />
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
