export type Movie = {
  id: number;
  title?: string;
  name?: string;
  status: string;
  adult: boolean;
  tagline?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  media_type?: string;
  vote_count: number;
  popularity: number;
  first_air_date: string;
  genre_ids: number[];
  runtime: number;
  budget: number;
  revenue: number;
  origin_country: string[];
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  production_companies?: {
    name: string;
  }[];
  number_of_episodes?: number;
  last_air_date: Date;
  episode_run_time?: number;
  networks: string[];
  number_of_seasons: number;
  created_by: { name: string }[];
};
