import { Movie } from "@/types/Movie";

export const saveCompletedMedia = async (media: Movie) => {
  const isMovie = media.title ? true :  false;

  return fetch('/api/movie-progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      media_id:media.id, 
      is_movie: isMovie, 
      title: media.title || media.name, 
      overview: media.overview, 
      poster_path: media.poster_path
    }),
  });
};
