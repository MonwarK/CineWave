
export type Review = {
  id: string
  created_at: Date;
  is_movie: boolean;
  movie_title: string;
  poster_path: string;
  rating: number
  review: string
  updated_at: Date;
  user_id: string
}