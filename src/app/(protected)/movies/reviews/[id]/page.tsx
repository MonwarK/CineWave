import Header from '@/components/main/Header';
import MovieBanner from '@/components/movie-content/MovieBanner';
import { Movie } from '@/types/Movie';
import { fetchMovieById } from '@/utils/api';
import React from 'react';

type Params = Promise<{ id: string }>;

export default async function page({ params }: { params: Params }) {
  const { id } = await params;
  const movie: Movie = await fetchMovieById(id);

  return (
    <div>
      <Header />
      <MovieBanner movie={movie} link={`/movies/watch/${movie.id}`} />

      <div></div>
    </div>
  );
}
