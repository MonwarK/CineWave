import { Movie } from '@/types/Movie';

export const saveMovie = async (movie: Movie) => {
  const isMovie = movie.title ? true : false;

  return fetch('/api/save-movie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      movie_id: movie.id,
      title: movie.title || movie.name,
      overview: movie.overview,
      isMovie,
      poster_path: movie.backdrop_path,
    }),
  });
};
