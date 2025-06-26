export type SavedMovie = {
  id: string;
  user_id: string;
  movie_id: string;
  title: string;
  poster_path: string;
  hasWatched: boolean;
  created_at: Date;
  isMovie: boolean;
  overview: string;
};
