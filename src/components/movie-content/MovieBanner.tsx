'use client';

import SquaredButton from '@/components/ui/SquaredButton';
import { useSavedMovies } from '@/context/SavedMoviesProvider';
import { Movie } from '@/types/Movie';
import { Check, Heart, Play, Plus, Share2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function MovieBanner({
  movie,
  link,
}: {
  movie: Movie;
  link: string;
}) {
  const { addMovie, isSaved } = useSavedMovies();
  const isMovie = movie.title ? true : false;

  return (
    <div className="flex flex-col justify-center items-center p-0">
      <div className="relative w-full overflow-hidden min-h-[50vh] text-white flex flex-col justify-end">
        <div className="absolute z-0 inset-0 h-full">
          <img
            className="h-full w-full object-cover object-top absolute top-0 left-0 brightness-50 -z-10"
            src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
          />
        </div>

        <div className="relative z-0 p-4 mx-auto w-full container space-y-10 mb-5 mt-20">
          <div className="space-y-5 lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold mb-5">
              {movie.title || movie.name}
            </h1>
            {movie.tagline && (
              <p className="text-xl text-gray-300 italic">"{movie.tagline}"</p>
            )}
            <p className="text-sm leading-relaxed">{movie.overview}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={link}>
              <SquaredButton>
                <Play className="w-5 h-5" />
                <p>Watch Now {!isMovie && 'S1 E1'}</p>
              </SquaredButton>
            </Link>

            {isSaved(movie.id) ? (
              <React.Fragment>
                <SquaredButton variant="secondary">
                  <Check className="w-5 h-5" />
                  <p>Added</p>
                </SquaredButton>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <SquaredButton
                  onClick={() => addMovie(movie)}
                  variant="secondary"
                >
                  <Plus className="w-5 h-5" />
                  <p>Watchlist</p>
                </SquaredButton>
              </React.Fragment>
            )}

            <SquaredButton variant="secondary">
              <Heart className="w-5 h-5" />
              <p>Favorite</p>
            </SquaredButton>
            <SquaredButton
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              variant="secondary"
            >
              <Share2 className="w-5 h-5" />
              <p>Share</p>
            </SquaredButton>
          </div>
        </div>
      </div>
    </div>
  );
}
