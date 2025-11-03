export type FinishedMedia = {
  id: string;
  user_id: string;
  media_id: number;
  is_movie: boolean;
  title: string;
  overview: string;
  poster_path: string;
  finished_at: Date;
}