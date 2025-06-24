import { Movie } from '@/types/Movie';

export const removeMovie = async (movie: Movie) => {
  const isMovie = movie.title ? true : false;

  return fetch('/api/remove-movie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      movie_id: movie.id,
      isMovie,
    }),
  });
};
