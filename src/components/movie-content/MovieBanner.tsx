'use client';

import SquaredButton from '@/components/ui/SquaredButton';
import { useSavedMovies } from '@/context/SavedMoviesProvider';
import { Movie } from '@/types/Movie';
import { Check, Clapperboard, Heart, Play, Plus, Share2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function MovieBanner({
  movie,
  link,
}: {
  movie: Movie;
  link: string;
}) {
  const { addMovie, deleteMovie, isSaved } = useSavedMovies();
  const isMovie = movie.title ? true : false;
  const [trailerKey, setTrailerKey] = useState('');

  useEffect(() => {
    document.title = `${movie.title || movie.name} | CineWave`;
  }, [movie]);

  useEffect(() => {
    if (!movie) return;

    const mediaType = movie.media_type || (movie.name ? 'tv' : 'movie');

    async function fetchTrailer() {
      if (!movie) return;

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await res.json();
        const trailer = data.results?.find(
          (v: any) =>
            (v.type === 'Trailer' ||
              v.type === 'Featurette' ||
              v.type === 'Clip' ||
              v.type === 'Opening Credits') &&
            v.site === 'YouTube'
        );
        setTrailerKey(trailer?.key || '');
      } catch (err) {
        console.error('Failed to fetch movie details or trailer', err);
      }
    }
    fetchTrailer();
  }, [movie]);

  return (
    <div className="flex flex-col justify-center items-center p-0">
      <div className="relative w-full overflow-hidden min-h-[50vh] text-white flex flex-col justify-end">
        <div className="absolute z-0 inset-0 h-full">
          <img
            className="h-full w-full object-cover object-top absolute top-0 left-0 brightness-50 -z-10"
            src={`https://image.tmdb.org/t/p/w1920${movie.backdrop_path}`}
          />
        </div>

        <div className="relative z-0 p-4 mx-auto w-full container space-y-10 mb-5 mt-20 flex items-center space-x-4 justify-between gap-15">
          <div className="flex-1">
            <div className="space-y-8 w-full">
              <div className="space-y-5">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {movie.title || movie.name}
                </h1>
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic">
                    "{movie.tagline}"
                  </p>
                )}
                <p className="text-sm leading-relaxed">{movie.overview}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={link}>
                  <SquaredButton>
                    <Play size={18} className="fill-white" />
                    <p>Watch Now {!isMovie && 'S1 E1'}</p>
                  </SquaredButton>
                </Link>

                {trailerKey && (
                  <Link
                    className="xl:hidden"
                    href={`https://www.youtube.com/watch?v=${trailerKey}`}
                    target="_blank"
                  >
                    <SquaredButton variant="secondary">
                      <Clapperboard className="w-5 h-5" />
                      <p>Play Trailer</p>
                    </SquaredButton>
                  </Link>
                )}

                {isSaved(movie.id, isMovie) ? (
                  <React.Fragment>
                    <SquaredButton
                      onClick={() => deleteMovie(movie, isMovie)}
                      variant="secondary"
                    >
                      <Check className="w-5 h-5" />
                      <p>Added</p>
                    </SquaredButton>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <SquaredButton
                      onClick={() => addMovie(movie, isMovie)}
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

          <div className="flex-1 xl:block hidden pl-14">
            {trailerKey && (
              <iframe
                className="w-full aspect-video rounded-md border-2 border-zinc-900/30"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
